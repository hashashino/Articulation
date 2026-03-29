import {
  sounds, soundsMap, CURRICULUM_ORDER,
  loadProgress, markComplete, getUnlocked, getNextInCurriculum,
  randomCorrect, randomTryAgain,
} from './data.js';
import { renderMouthSVG } from './mouthDiagram.js';

// ══════════════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════════════
const state = {
  screen: 'home',      // 'home' | 'practice' | 'celebration'
  selectedSound: null,
  sessionScore: { correct: 0, total: 0 },
  progress: loadProgress(),

  // practice sub-state
  cardIndex: 0,
  phase: 'idle',       // 'idle' | 'listening' | 'result' | 'encouragement'
  recognitionResult: null,  // 'correct' | 'try-again' | 'unsupported' | null
  micError: null,           // 'blocked' | 'nospeech' | 'nobrowser' | 'other' | null
  transcript: '',
  direction: 1,

  // voice features
  listening: false,
  speaking: false,
};

// ══════════════════════════════════════════════════════════════════════
// WEB API HELPERS
// ══════════════════════════════════════════════════════════════════════

// Speech Synthesis
function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  state.speaking = true;
  updateSpeakingUI();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.85;
  u.pitch = 1.1;
  u.onend = u.onerror = () => { state.speaking = false; updateSpeakingUI(); };
  window.speechSynthesis.speak(u);
}

function updateSpeakingUI() {
  const btn = document.getElementById('btn-hear');
  if (!btn) return;
  btn.classList.toggle('speaking', state.speaking);
  btn.innerHTML = state.speaking
    ? '<span>👂</span> Listening...'
    : '<span>👂</span> Hear it!';
}

// Speech Recognition
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let recognitionTimeout = null;

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m+1 }, (_, i) => Array.from({ length: n+1 }, (_, j) => i===0?j:j===0?i:0));
  for (let i=1;i<=m;i++) for (let j=1;j<=n;j++)
    dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

function startListening(targetWord) {
  if (!SR) {
    state.micError = 'nobrowser';
    state.recognitionResult = 'unsupported';
    state.phase = 'result';
    renderPracticeScreen();
    return;
  }

  // Stop any playing speech so it doesn't bleed into the mic
  if (window.speechSynthesis) window.speechSynthesis.cancel();

  // Clean up previous instance — null handlers first so no stale callbacks fire
  const prev = recognition;
  recognition = null;
  if (prev) {
    prev.onstart = null;
    prev.onresult = null;
    prev.onerror = null;
    prev.onend = null;
    try { prev.abort(); } catch {}
  }
  clearTimeout(recognitionTimeout);

  // Use a local ref so stale onend/onerror from a previous instance can't corrupt state
  const rec = new SR();
  recognition = rec;
  rec.continuous = false;
  rec.interimResults = false;
  rec.lang = 'en-US';
  rec.maxAlternatives = 3;

  rec.onstart = () => {
    if (recognition !== rec) return; // stale — a newer call already took over
    state.listening = true;
    state.micError = null;
    state.phase = 'listening';
    renderPracticeScreen(); // always re-render so "Listening!" shows even on retry
    recognitionTimeout = setTimeout(() => {
      if (recognition !== rec || !state.listening) return;
      // Force-recover: don't rely on onend firing (some mobile browsers skip it)
      rec.onresult = null;
      rec.onerror = null;
      rec.onend = null;
      recognition = null;
      state.listening = false;
      state.micError = 'nospeech';
      state.recognitionResult = 'unsupported';
      state.phase = 'result';
      try { rec.abort(); } catch {}
      renderPracticeScreen();
    }, 8000);
  };

  rec.onresult = (evt) => {
    if (recognition !== rec) return;
    clearTimeout(recognitionTimeout);
    const alts = Array.from(evt.results[0]).map(a => a.transcript.toLowerCase().trim());
    state.transcript = alts[0] || '';
    const target = targetWord.toLowerCase();
    const ok = alts.some(a => a === target || a.includes(target) || target.includes(a) || levenshtein(a, target) <= 1);
    state.recognitionResult = ok ? 'correct' : 'try-again';
    if (ok) state.sessionScore.correct++;
    state.sessionScore.total++;
    state.listening = false;
    state.phase = 'result';
    recognition = null;
    renderPracticeScreen();
  };

  rec.onerror = (evt) => {
    if (recognition !== rec) return;
    clearTimeout(recognitionTimeout);
    state.listening = false;
    if (evt.error === 'not-allowed' || evt.error === 'permission-denied') {
      state.micError = 'blocked';
    } else if (evt.error === 'no-speech') {
      state.micError = 'nospeech';
    } else {
      state.micError = 'other';
    }
    state.recognitionResult = 'unsupported';
    state.phase = 'result';
    recognition = null;
    renderPracticeScreen();
  };

  rec.onend = () => {
    if (recognition !== rec) return; // stale
    clearTimeout(recognitionTimeout);
    recognition = null;
    // onend fires after onresult too — only act if we never got a result/error
    if (state.listening) {
      state.listening = false;
      state.micError = 'nospeech';
      state.recognitionResult = 'unsupported';
      state.phase = 'result';
      renderPracticeScreen();
    }
  };

  try {
    rec.start();
  } catch {
    recognition = null;
    state.listening = false;
    state.micError = 'other';
    state.recognitionResult = 'unsupported';
    state.phase = 'result';
    renderPracticeScreen();
  }
}


// ══════════════════════════════════════════════════════════════════════
// ENCOURAGEMENT OVERLAY
// ══════════════════════════════════════════════════════════════════════
function showEncouragement(msg) {
  const el = document.getElementById('encouragement-overlay');
  if (!el) return;
  el.innerHTML = `
    <div class="encouragement-card">
      <span class="encouragement-star">🌟</span>
      <span class="encouragement-text" style="color:${msg.color}">${msg.text}</span>
    </div>`;
  el.classList.remove('hidden');
  setTimeout(() => { el.classList.add('hidden'); el.innerHTML = ''; }, 1500);
}

// ══════════════════════════════════════════════════════════════════════
// LETTER HIGHLIGHT (reading helper)
// ══════════════════════════════════════════════════════════════════════
let letterTimer = null;

function animateLetters(letters, color) {
  const el = document.getElementById('card-word-letters');
  if (!el || !letters) return;

  // Render letter spans
  el.innerHTML = letters.map((l, i) =>
    `<span class="letter" id="letter-${i}" style="transition: color .15s, font-size .15s">${l}</span>`
  ).join('');

  clearTimeout(letterTimer);
  let i = 0;
  function step() {
    // Unhighlight previous
    if (i > 0) {
      const prev = document.getElementById(`letter-${i-1}`);
      if (prev) { prev.style.color = '#1f2937'; prev.style.fontSize = ''; }
    }
    if (i < letters.length) {
      const cur = document.getElementById(`letter-${i}`);
      if (cur) { cur.style.color = color; cur.style.fontSize = '2.8rem'; }
      i++;
      letterTimer = setTimeout(step, 350);
    }
  }
  step();
}

// ══════════════════════════════════════════════════════════════════════
// HOME SCREEN
// ══════════════════════════════════════════════════════════════════════
function renderHome() {
  const { completedSounds = [], totalStars = 0 } = state.progress;
  const unlocked = getUnlocked(completedSounds);

  const curriculumBtns = CURRICULUM_ORDER.map(key => {
    const s = soundsMap[key];
    const isCompleted = completedSounds.includes(key);
    const isUnlocked = unlocked.has(key);
    const isNext = isUnlocked && !isCompleted;
    const cls = isCompleted ? 'completed' : isNext ? 'next' : 'locked';
    return `
      <button class="curriculum-btn ${cls}" data-key="${key}"
        ${!isUnlocked ? 'disabled' : ''}
        style="${isUnlocked ? `background:${s.color}; color:#fff;` : ''}">
        <span class="cb-emoji">${isCompleted ? '⭐' : isUnlocked ? s.emoji : '🔒'}</span>
        <span>${s.label}</span>
      </button>`;
  }).join('');

  const soundBtns = sounds.map((s, idx) => `
    <button class="sound-btn" data-key="${s.key}"
      style="background:${s.color}; animation-delay:${idx * 30}ms">
      <span class="sb-emoji">${s.emoji}</span>
      <span class="sb-label">${s.label}</span>
      ${completedSounds.includes(s.key) ? '<span class="sb-badge">⭐</span>' : ''}
    </button>`
  ).join('');

  document.getElementById('app').innerHTML = `
    <div class="screen home-screen">
      <div class="home-header">
        <div>
          <div class="home-title">Let's Practice<br>Sounds! 🦜</div>
          <div class="home-subtitle">Tap a sound to start!</div>
        </div>
        <div class="star-badge">
          <span class="star-icon">⭐</span>
          <span class="star-count">${totalStars}</span>
        </div>
      </div>

      <div class="section-label">My Learning Path</div>
      <div class="curriculum-strip">${curriculumBtns}</div>

      <hr class="divider" />

      <div class="section-label">All Sounds — Free Practice</div>
      <div class="sounds-grid">${soundBtns}</div>
    </div>
    <div id="encouragement-overlay" class="encouragement-overlay hidden"></div>`;

  // Attach events
  document.querySelectorAll('[data-key]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      if (!key) return;
      navigateToPractice(key);
    });
  });
}

// ══════════════════════════════════════════════════════════════════════
// PRACTICE SCREEN
// ══════════════════════════════════════════════════════════════════════
function navigateToPractice(soundKey) {
  state.selectedSound = soundKey;
  state.cardIndex = 0;
  state.phase = 'idle';
  state.recognitionResult = null;
  state.micError = null;
  state.transcript = '';
  state.listening = false;
  state.speaking = false;
  state.sessionScore = { correct: 0, total: 0 };
  state.screen = 'practice';
  renderPracticeScreen();
}

function renderPracticeScreen() {
  const sound = soundsMap[state.selectedSound];
  const word = sound.words[state.cardIndex];
  const isLast = state.cardIndex === sound.words.length - 1;
  const { completedSounds = [], totalStars = 0 } = state.progress;

  // Build recognition result block
  let resultBlock = '';
  if (state.phase === 'result') {
    const r = state.recognitionResult;
    if (r === 'correct') {
      resultBlock = `
        <div class="recognition-result correct">
          <span class="result-icon">⭐</span>
          <span class="result-label" style="color:#16a34a">Great job!</span>
          ${state.transcript ? `<span class="result-transcript">I heard: "${state.transcript}"</span>` : ''}
          <button class="btn-next" id="btn-rn-next">Next word →</button>
        </div>`;
    } else if (r === 'try-again') {
      resultBlock = `
        <div class="recognition-result try-again">
          <span class="result-icon">💪</span>
          <span class="result-label" style="color:#ea580c">Good try! Say it again!</span>
          ${state.transcript ? `<span class="result-transcript">I heard: "${state.transcript}"</span>` : ''}
          <button class="btn-say btn-say-retry" id="btn-rn-retry">
            <span class="say-icon">🎤</span>
            <span class="say-text">Say it!</span>
          </button>
          <button class="btn-skip" id="btn-rn-skip">Skip →</button>
        </div>`;
    } else {
      const canRetryMic = state.micError !== 'blocked' && state.micError !== 'nobrowser';
      const micMsg = state.micError === 'blocked'
        ? '🚫 Microphone blocked! Tap the 🔒 lock in your browser address bar and allow the microphone.'
        : state.micError === 'nospeech'
        ? "Couldn't hear you! Try speaking louder."
        : state.micError === 'nobrowser'
        ? '😅 Voice not supported here. Use Chrome or Safari!'
        : "Couldn't hear you! Try again.";
      resultBlock = `
        <div class="recognition-result unsupported">
          <span class="result-icon">${state.micError === 'blocked' ? '🚫' : '🎤'}</span>
          <span class="result-label" style="color:#4b5563;font-size:1rem;text-align:center;line-height:1.4">${micMsg}</span>
          ${canRetryMic ? `
          <button class="btn-say btn-say-retry" id="btn-rn-retry">
            <span class="say-icon">🎤</span>
            <span class="say-text">Try again!</span>
          </button>` : ''}
          <div class="result-buttons">
            <button class="btn-next" id="btn-rn-yes">✅ I said it!</button>
            <button class="btn-skip" id="btn-rn-skip">Skip →</button>
          </div>
        </div>`;
    }
  }

  // Progress dots
  const dots = sound.words.map((_, i) => {
    let cls = i < state.cardIndex ? 'dot past' : i === state.cardIndex ? `dot current` : 'dot future';
    let style = i === state.cardIndex ? `background:${sound.color}` : '';
    return `<div class="${cls}" style="${style}"></div>`;
  }).join('');

  // Letters display for reading
  const lettersHtml = word.letters
    ? `<div id="card-word-letters" class="card-word" style="display:flex;gap:2px;justify-content:center;flex-wrap:wrap;">
        ${word.letters.map(l => `<span class="letter" style="min-width:22px;text-align:center">${l}</span>`).join('')}
      </div>`
    : `<div class="card-word">${word.word}</div>`;

  document.getElementById('app').innerHTML = `
    <div class="screen practice-screen">
      <!-- Header band -->
      <div style="background:${sound.color}; padding:12px 16px 8px;">
        <div class="practice-header">
          <button class="btn-back" id="btn-back">← Back</button>
          <div style="text-align:center">
            <div class="sound-label-header">${sound.label}</div>
            <div class="sound-meta">${sound.emoji} ${sound.words.length} words</div>
          </div>
          <div class="score-chip">
            ⭐ ${state.sessionScore.correct}<br>
            <span style="font-size:.7rem;opacity:.8">${state.sessionScore.total} tries</span>
          </div>
        </div>
        <div class="progress-dots">${dots}</div>
      </div>

      <!-- Picture card -->
      <div class="card-container">
        <div class="picture-card" style="border-color:${sound.color}">
          <div class="card-emoji">${word.emoji}</div>
          ${lettersHtml}
        </div>
      </div>

      <!-- Nav + Hear row -->
      <div class="action-row">
        <button class="btn-nav" id="btn-prev" ${state.cardIndex === 0 ? 'disabled' : ''}>←</button>
        <button class="btn-hear" id="btn-hear">
          <span>👂</span> Hear it!
        </button>
        <button class="btn-nav" id="btn-next-card">${isLast ? '🏁' : '→'}</button>
      </div>

      <!-- Articulation diagram -->
      <div class="diagram-toggle">
        <button class="diagram-toggle-btn" id="btn-diagram-toggle">
          <span>👄 How to say it</span>
          <span class="arrow" id="diagram-arrow">▼</span>
        </button>
        <div class="diagram-body" id="diagram-body">
          <div class="diagram-tip" style="background:${sound.color}">${sound.tip}</div>
          <div id="diagram-svg-container"></div>
        </div>
      </div>

      <!-- Say it button -->
      ${state.phase === 'idle' || state.phase === 'listening' ? `
        <div class="say-it-section">
          <button class="btn-say${state.listening ? ' listening' : ''}" id="btn-say"
            ${state.listening ? 'disabled' : ''}>
            <span class="mic-ring${state.listening ? '' : ' hidden'}"></span>
            <span class="mic-ring-2${state.listening ? '' : ' hidden'}"></span>
            <span class="say-icon">🎤</span>
            <span class="say-text">${state.listening ? 'Listening!' : 'Say it!'}</span>
          </button>
          <span class="say-hint${state.listening ? '' : ' hidden'}" id="say-hint">Say the word now!</span>
        </div>` : ''}

      <!-- Recognition result -->
      ${resultBlock}

    </div>
    <div id="encouragement-overlay" class="encouragement-overlay hidden"></div>`;

  // ── Attach events ──
  document.getElementById('btn-back').addEventListener('click', () => {
    state.screen = 'home';
    renderHome();
  });

  document.getElementById('btn-hear').addEventListener('click', () => {
    speak(word.word);
    // Animate letters when word is spoken
    if (word.letters) animateLetters(word.letters, sound.color);
  });

  document.getElementById('btn-prev').addEventListener('click', () => {
    if (state.cardIndex > 0) {
      state.cardIndex--;
      state.phase = 'idle';
      state.recognitionResult = null;
      state.transcript = '';
      renderPracticeScreen();
    }
  });

  document.getElementById('btn-next-card').addEventListener('click', () => advanceCard());

  // Diagram toggle
  document.getElementById('btn-diagram-toggle').addEventListener('click', () => {
    const body = document.getElementById('diagram-body');
    const arrow = document.getElementById('diagram-arrow');
    const isOpen = body.classList.toggle('open');
    arrow.classList.toggle('open', isOpen);
    if (isOpen) {
      const container = document.getElementById('diagram-svg-container');
      container.innerHTML = renderMouthSVG(sound.phonemeClass, sound.color);
    }
  });

  // Say it
  const sayBtn = document.getElementById('btn-say');
  if (sayBtn) {
    sayBtn.addEventListener('click', () => {
      if (state.phase !== 'idle') return;
      startListening(word.word);
    });
  }

  // Result buttons
  const rnNext = document.getElementById('btn-rn-next');
  const rnYes  = document.getElementById('btn-rn-yes');
  const rnRetry = document.getElementById('btn-rn-retry');
  const rnSkip  = document.getElementById('btn-rn-skip');
  if (rnNext) rnNext.addEventListener('click', () => advanceCard(true));
  if (rnYes)  rnYes.addEventListener('click',  () => advanceCard(false));
  if (rnRetry) rnRetry.addEventListener('click', () => {
    state.recognitionResult = null;
    state.micError = null;
    state.transcript = '';
    startListening(word.word); // onstart will re-render to show Listening!
  });
  if (rnSkip) rnSkip.addEventListener('click', () => advanceCard(false));
}

function advanceCard(showMsg = true) {
  const sound = soundsMap[state.selectedSound];
  const isLast = state.cardIndex === sound.words.length - 1;

  if (showMsg) {
    const msg = state.recognitionResult === 'correct' ? randomCorrect() : randomTryAgain();
    showEncouragement(msg);
  }

  if (isLast) {
    // Complete the sound
    const { correct, total } = state.sessionScore;
    const stars = correct >= total * .8 ? 3 : correct >= total * .5 ? 2 : 1;
    state.progress = markComplete(state.selectedSound, stars);
    state.screen = 'celebration';
    setTimeout(renderCelebration, showMsg ? 1200 : 0);
    return;
  }

  state.cardIndex++;
  state.phase = 'idle';
  state.recognitionResult = null;
  state.transcript = '';
  if (state.audioUrl) { URL.revokeObjectURL(state.audioUrl); state.audioUrl = null; }
  setTimeout(renderPracticeScreen, showMsg ? 300 : 0);
}

// ══════════════════════════════════════════════════════════════════════
// CELEBRATION SCREEN
// ══════════════════════════════════════════════════════════════════════
function renderCelebration() {
  const sound = soundsMap[state.selectedSound];
  const { correct, total } = state.sessionScore;
  const stars = correct >= total * .8 ? 3 : correct >= total * .5 ? 2 : 1;
  const nextKey = getNextInCurriculum(state.selectedSound, state.progress.completedSounds);
  const nextSound = nextKey ? soundsMap[nextKey] : null;

  const starsHtml = [1,2,3].map(n =>
    `<span class="cel-star" id="cel-star-${n}">⭐</span>`
  ).join('');

  document.getElementById('app').innerHTML = `
    <div class="screen celebration-screen">
      <div class="confetti-container" id="confetti"></div>
      <div class="celebration-card">
        <span class="cel-trophy">🏆</span>
        <div class="text-center">
          <div class="cel-title">You did it!</div>
          <div class="cel-subtitle">Finished ${sound.label} sounds!</div>
        </div>
        <div class="stars-row">${starsHtml}</div>
        <div class="score-box">
          <div class="score-number">${correct} / ${total}</div>
          <div class="score-label">words correct</div>
        </div>
        <div class="cel-buttons">
          ${nextSound ? `
            <button class="btn-cel-next" id="btn-cel-next"
              style="background:${nextSound.color}">
              Next: ${nextSound.label} ${nextSound.emoji} →
            </button>` : ''}
          <button class="btn-cel-play" id="btn-cel-play">🔁 Play Again</button>
          <button class="btn-cel-home" id="btn-cel-home">🏠 Home</button>
        </div>
      </div>
    </div>`;

  // Animate stars
  for (let n = 1; n <= 3; n++) {
    setTimeout(() => {
      const el = document.getElementById(`cel-star-${n}`);
      if (el && n <= stars) el.classList.add('lit');
    }, (n - 1) * 360);
  }

  // Confetti
  spawnConfetti();

  // Button events
  const nextBtn = document.getElementById('btn-cel-next');
  if (nextBtn) nextBtn.addEventListener('click', () => navigateToPractice(nextKey));
  document.getElementById('btn-cel-play').addEventListener('click', () => navigateToPractice(state.selectedSound));
  document.getElementById('btn-cel-home').addEventListener('click', () => { state.screen = 'home'; renderHome(); });
}

const CONFETTI_COLORS = ['#f472b6','#facc15','#4ade80','#60a5fa','#a78bfa','#fb923c','#34d399'];

function spawnConfetti() {
  const container = document.getElementById('confetti');
  if (!container) return;
  for (let i = 0; i < 45; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    const size = 8 + Math.random() * 10;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      background: ${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
      border-radius: ${Math.random() > .5 ? '50%' : '2px'};
      animation-duration: ${2 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 1.5}s;
      transform: rotate(${Math.random() * 360}deg);
    `;
    container.appendChild(p);
  }
}

// ══════════════════════════════════════════════════════════════════════
// BOOT
// ══════════════════════════════════════════════════════════════════════
renderHome();
