// Kid-friendly articulation guides — simple emoji steps, no confusing diagrams
// Shown when child taps "How to say it 👄"

const CONFIGS = {
  bilabial: {
    bigEmoji: '🤐',
    title: 'Press lips together!',
    steps: [
      { emoji: '😮', text: 'Open your mouth' },
      { emoji: '🤐', text: 'Press lips tight shut' },
      { emoji: '💨', text: 'Pop them open — say it!' },
    ],
  },
  alveolar: {
    bigEmoji: '👅',
    title: 'Tongue tip goes up!',
    steps: [
      { emoji: '😮', text: 'Open mouth a little bit' },
      { emoji: '👅', text: 'Tongue tip touches behind top teeth' },
      { emoji: '✨', text: 'Let the air out!' },
    ],
  },
  velar: {
    bigEmoji: '😮',
    title: 'Back of tongue goes up!',
    steps: [
      { emoji: '😮', text: 'Open your mouth' },
      { emoji: '🌊', text: 'Lift the BACK of your tongue up' },
      { emoji: '💨', text: 'Release — say it!' },
    ],
  },
  labiodental: {
    bigEmoji: '😬',
    title: 'Top teeth on lower lip!',
    steps: [
      { emoji: '😁', text: 'Show your top teeth' },
      { emoji: '😬', text: 'Rest top teeth on lower lip' },
      { emoji: '💨', text: 'Blow air out!' },
    ],
  },
  sibilant: {
    bigEmoji: '🐍',
    title: 'Make a hissing sound!',
    steps: [
      { emoji: '😁', text: 'Show your teeth — almost closed' },
      { emoji: '👅', text: 'Tongue near (not touching) teeth' },
      { emoji: '🐍', text: 'Sssss — like a snake!' },
    ],
  },
  glottal: {
    bigEmoji: '😲',
    title: 'Open mouth, breathe out!',
    steps: [
      { emoji: '😲', text: 'Open your mouth wide' },
      { emoji: '🌬️', text: 'Breathe out warm air' },
      { emoji: '🪞', text: 'Like fogging a mirror!' },
    ],
  },
  glide: {
    bigEmoji: '😗',
    title: 'Round your lips like an O!',
    steps: [
      { emoji: '😗', text: 'Round lips into an O shape' },
      { emoji: '🫧', text: 'Like you are blowing bubbles' },
      { emoji: '💬', text: 'Say it — Wuh!' },
    ],
  },
  rhotic: {
    bigEmoji: '🌀',
    title: 'Curl your tongue back!',
    steps: [
      { emoji: '😮', text: 'Open your mouth a little' },
      { emoji: '🌀', text: 'Curl tongue tip UP and BACK' },
      { emoji: '🦁', text: 'Rrrrr — do not touch anything!' },
    ],
  },
};

export function renderMouthSVG(phonemeClass, accentColor = '#8b5cf6') {
  const c = CONFIGS[phonemeClass] || CONFIGS.bilabial;

  const stepsHtml = c.steps.map(s => `
    <div style="display:flex;align-items:center;gap:10px;
                background:#f9fafb;border-radius:14px;padding:10px 14px;
                border:2px solid #f3f4f6">
      <span style="font-size:1.8rem;min-width:36px;text-align:center">${s.emoji}</span>
      <span style="font-size:.9rem;font-weight:800;color:#374151;line-height:1.3">${s.text}</span>
    </div>`).join('');

  return `
    <div style="padding:4px 0 8px">
      <div style="text-align:center;margin-bottom:10px">
        <span style="font-size:4.5rem">${c.bigEmoji}</span>
      </div>
      <div style="font-size:1rem;font-weight:900;text-align:center;
                  color:${accentColor};margin-bottom:12px;padding:0 4px">
        ${c.title}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${stepsHtml}
      </div>
    </div>`;
}
