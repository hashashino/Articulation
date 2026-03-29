// Phoneme classes → SVG diagram types
export const PHONEME_CLASSES = {
  bilabial:    ['p', 'b', 'm'],
  alveolar:    ['t', 'd', 'n', 'l'],
  velar:       ['k', 'g'],
  labiodental: ['f', 'v'],
  sibilant:    ['s', 'z'],
  glottal:     ['h'],
  glide:       ['w'],
  rhotic:      ['r'],
};

// Developmental order: easiest → hardest for 5-year-olds
export const CURRICULUM_ORDER = ['m','p','b','t','d','n','h','w','k','g','f','l','s','r'];

export const sounds = [
  {
    key: 'm', label: '/m/', phonemeClass: 'bilabial',
    emoji: '🎵', color: '#a78bfa', colorLight: '#ede9fe', curriculumLevel: 1,
    tip: 'Press your lips together and hum!',
    blendWords: ['mop', 'map', 'mud'],
    words: [
      { word: 'moon',   emoji: '🌙', letters: ['m','o','o','n'] },
      { word: 'monkey', emoji: '🐒', letters: ['m','o','n','k','e','y'] },
      { word: 'milk',   emoji: '🥛', letters: ['m','i','l','k'] },
      { word: 'map',    emoji: '🗺️', letters: ['m','a','p'] },
      { word: 'mouse',  emoji: '🐭', letters: ['m','o','u','s','e'] },
      { word: 'mop',    emoji: '🧹', letters: ['m','o','p'] },
      { word: 'melon',  emoji: '🍈', letters: ['m','e','l','o','n'] },
      { word: 'mitt',   emoji: '🧤', letters: ['m','i','t','t'] },
    ],
  },
  {
    key: 'p', label: '/p/', phonemeClass: 'bilabial',
    emoji: '🐷', color: '#f472b6', colorLight: '#fce7f3', curriculumLevel: 2,
    tip: 'Press your lips together, then pop them open!',
    blendWords: ['pig', 'pop', 'pan'],
    words: [
      { word: 'pig',   emoji: '🐷', letters: ['p','i','g'] },
      { word: 'pizza', emoji: '🍕', letters: ['p','i','z','z','a'] },
      { word: 'pan',   emoji: '🍳', letters: ['p','a','n'] },
      { word: 'pen',   emoji: '✏️', letters: ['p','e','n'] },
      { word: 'puppy', emoji: '🐶', letters: ['p','u','p','p','y'] },
      { word: 'plane', emoji: '✈️', letters: ['p','l','a','n','e'] },
      { word: 'pear',  emoji: '🍐', letters: ['p','e','a','r'] },
      { word: 'pop',   emoji: '🍭', letters: ['p','o','p'] },
    ],
  },
  {
    key: 'b', label: '/b/', phonemeClass: 'bilabial',
    emoji: '🐝', color: '#facc15', colorLight: '#fef9c3', curriculumLevel: 3,
    tip: 'Press your lips together and let your voice buzz!',
    blendWords: ['big', 'bus', 'bat'],
    words: [
      { word: 'ball',  emoji: '⚽', letters: ['b','a','l','l'] },
      { word: 'bear',  emoji: '🐻', letters: ['b','e','a','r'] },
      { word: 'bus',   emoji: '🚌', letters: ['b','u','s'] },
      { word: 'book',  emoji: '📚', letters: ['b','o','o','k'] },
      { word: 'bird',  emoji: '🐦', letters: ['b','i','r','d'] },
      { word: 'boat',  emoji: '⛵', letters: ['b','o','a','t'] },
      { word: 'bug',   emoji: '🐛', letters: ['b','u','g'] },
      { word: 'bow',   emoji: '🎀', letters: ['b','o','w'] },
    ],
  },
  {
    key: 't', label: '/t/', phonemeClass: 'alveolar',
    emoji: '🐢', color: '#4ade80', colorLight: '#dcfce7', curriculumLevel: 4,
    tip: 'Tap your tongue behind your top teeth!',
    blendWords: ['top', 'tap', 'tub'],
    words: [
      { word: 'turtle', emoji: '🐢', letters: ['t','u','r','t','l','e'] },
      { word: 'tiger',  emoji: '🐯', letters: ['t','i','g','e','r'] },
      { word: 'top',    emoji: '🪀', letters: ['t','o','p'] },
      { word: 'toad',   emoji: '🐸', letters: ['t','o','a','d'] },
      { word: 'tent',   emoji: '⛺', letters: ['t','e','n','t'] },
      { word: 'tub',    emoji: '🛁', letters: ['t','u','b'] },
      { word: 'teeth',  emoji: '🦷', letters: ['t','e','e','t','h'] },
      { word: 'two',    emoji: '2️⃣', letters: ['t','w','o'] },
    ],
  },
  {
    key: 'd', label: '/d/', phonemeClass: 'alveolar',
    emoji: '🦆', color: '#60a5fa', colorLight: '#dbeafe', curriculumLevel: 5,
    tip: 'Tap your tongue behind your top teeth with your voice on!',
    blendWords: ['dig', 'dot', 'den'],
    words: [
      { word: 'duck',  emoji: '🦆', letters: ['d','u','c','k'] },
      { word: 'dog',   emoji: '🐕', letters: ['d','o','g'] },
      { word: 'door',  emoji: '🚪', letters: ['d','o','o','r'] },
      { word: 'drum',  emoji: '🥁', letters: ['d','r','u','m'] },
      { word: 'doll',  emoji: '🪆', letters: ['d','o','l','l'] },
      { word: 'deer',  emoji: '🦌', letters: ['d','e','e','r'] },
      { word: 'dive',  emoji: '🤿', letters: ['d','i','v','e'] },
      { word: 'den',   emoji: '🏕️', letters: ['d','e','n'] },
    ],
  },
  {
    key: 'n', label: '/n/', phonemeClass: 'alveolar',
    emoji: '🌙', color: '#818cf8', colorLight: '#e0e7ff', curriculumLevel: 6,
    tip: 'Touch your tongue up and hum through your nose!',
    blendWords: ['net', 'nap', 'nod'],
    words: [
      { word: 'nose',  emoji: '👃', letters: ['n','o','s','e'] },
      { word: 'nest',  emoji: '🪺', letters: ['n','e','s','t'] },
      { word: 'net',   emoji: '🥅', letters: ['n','e','t'] },
      { word: 'nut',   emoji: '🥜', letters: ['n','u','t'] },
      { word: 'nail',  emoji: '💅', letters: ['n','a','i','l'] },
      { word: 'night', emoji: '🌃', letters: ['n','i','g','h','t'] },
      { word: 'nap',   emoji: '😴', letters: ['n','a','p'] },
      { word: 'nod',   emoji: '🙂', letters: ['n','o','d'] },
    ],
  },
  {
    key: 'h', label: '/h/', phonemeClass: 'glottal',
    emoji: '🏠', color: '#fb923c', colorLight: '#ffedd5', curriculumLevel: 7,
    tip: 'Open your mouth and breathe out warm air like fogging a mirror!',
    blendWords: ['hat', 'hop', 'hen'],
    words: [
      { word: 'house',  emoji: '🏠', letters: ['h','o','u','s','e'] },
      { word: 'hat',    emoji: '🎩', letters: ['h','a','t'] },
      { word: 'hand',   emoji: '✋', letters: ['h','a','n','d'] },
      { word: 'heart',  emoji: '❤️', letters: ['h','e','a','r','t'] },
      { word: 'hippo',  emoji: '🦛', letters: ['h','i','p','p','o'] },
      { word: 'hen',    emoji: '🐔', letters: ['h','e','n'] },
      { word: 'hug',    emoji: '🤗', letters: ['h','u','g'] },
      { word: 'hop',    emoji: '🐰', letters: ['h','o','p'] },
    ],
  },
  {
    key: 'w', label: '/w/', phonemeClass: 'glide',
    emoji: '🌊', color: '#22d3ee', colorLight: '#cffafe', curriculumLevel: 8,
    tip: "Round your lips like you're blowing bubbles!",
    blendWords: ['web', 'wig', 'wet'],
    words: [
      { word: 'wave',   emoji: '🌊', letters: ['w','a','v','e'] },
      { word: 'worm',   emoji: '🪱', letters: ['w','o','r','m'] },
      { word: 'web',    emoji: '🕸️', letters: ['w','e','b'] },
      { word: 'wolf',   emoji: '🐺', letters: ['w','o','l','f'] },
      { word: 'wig',    emoji: '💇', letters: ['w','i','g'] },
      { word: 'well',   emoji: '💧', letters: ['w','e','l','l'] },
      { word: 'waffle', emoji: '🧇', letters: ['w','a','f','f','l','e'] },
      { word: 'wing',   emoji: '🪁', letters: ['w','i','n','g'] },
    ],
  },
  {
    key: 'k', label: '/k/', phonemeClass: 'velar',
    emoji: '🐱', color: '#fb7185', colorLight: '#ffe4e6', curriculumLevel: 9,
    tip: 'Lift the back of your tongue up to the top of your mouth!',
    blendWords: ['cat', 'cup', 'cap'],
    words: [
      { word: 'cat',  emoji: '🐱', letters: ['c','a','t'] },
      { word: 'key',  emoji: '🔑', letters: ['k','e','y'] },
      { word: 'king', emoji: '👑', letters: ['k','i','n','g'] },
      { word: 'cap',  emoji: '🧢', letters: ['c','a','p'] },
      { word: 'cup',  emoji: '☕', letters: ['c','u','p'] },
      { word: 'cake', emoji: '🎂', letters: ['c','a','k','e'] },
      { word: 'cow',  emoji: '🐮', letters: ['c','o','w'] },
      { word: 'kick', emoji: '⚽', letters: ['k','i','c','k'] },
    ],
  },
  {
    key: 'g', label: '/g/', phonemeClass: 'velar',
    emoji: '🦒', color: '#a3e635', colorLight: '#ecfccb', curriculumLevel: 10,
    tip: 'Lift the back of your tongue with your voice on!',
    blendWords: ['got', 'gum', 'gap'],
    words: [
      { word: 'goat',  emoji: '🐐', letters: ['g','o','a','t'] },
      { word: 'girl',  emoji: '👧', letters: ['g','i','r','l'] },
      { word: 'game',  emoji: '🎮', letters: ['g','a','m','e'] },
      { word: 'grape', emoji: '🍇', letters: ['g','r','a','p','e'] },
      { word: 'gold',  emoji: '🏅', letters: ['g','o','l','d'] },
      { word: 'gift',  emoji: '🎁', letters: ['g','i','f','t'] },
      { word: 'gum',   emoji: '🍬', letters: ['g','u','m'] },
      { word: 'gate',  emoji: '🚧', letters: ['g','a','t','e'] },
    ],
  },
  {
    key: 'f', label: '/f/', phonemeClass: 'labiodental',
    emoji: '🦊', color: '#fbbf24', colorLight: '#fef3c7', curriculumLevel: 11,
    tip: 'Put your top teeth gently on your bottom lip and blow!',
    blendWords: ['fox', 'fan', 'fit'],
    words: [
      { word: 'fox',    emoji: '🦊', letters: ['f','o','x'] },
      { word: 'fish',   emoji: '🐟', letters: ['f','i','s','h'] },
      { word: 'frog',   emoji: '🐸', letters: ['f','r','o','g'] },
      { word: 'fan',    emoji: '🌀', letters: ['f','a','n'] },
      { word: 'flag',   emoji: '🚩', letters: ['f','l','a','g'] },
      { word: 'flower', emoji: '🌸', letters: ['f','l','o','w','e','r'] },
      { word: 'fork',   emoji: '🍴', letters: ['f','o','r','k'] },
      { word: 'foot',   emoji: '🦶', letters: ['f','o','o','t'] },
    ],
  },
  {
    key: 'l', label: '/l/', phonemeClass: 'alveolar',
    emoji: '🦁', color: '#2dd4bf', colorLight: '#ccfbf1', curriculumLevel: 12,
    tip: 'Touch your tongue tip behind your top teeth and let air flow over the sides!',
    blendWords: ['lip', 'log', 'lap'],
    words: [
      { word: 'lion',  emoji: '🦁', letters: ['l','i','o','n'] },
      { word: 'lamp',  emoji: '💡', letters: ['l','a','m','p'] },
      { word: 'leaf',  emoji: '🍃', letters: ['l','e','a','f'] },
      { word: 'lemon', emoji: '🍋', letters: ['l','e','m','o','n'] },
      { word: 'lock',  emoji: '🔒', letters: ['l','o','c','k'] },
      { word: 'log',   emoji: '🪵', letters: ['l','o','g'] },
      { word: 'lid',   emoji: '🫙', letters: ['l','i','d'] },
      { word: 'lip',   emoji: '💋', letters: ['l','i','p'] },
    ],
  },
  {
    key: 's', label: '/s/', phonemeClass: 'sibilant',
    emoji: '🐍', color: '#34d399', colorLight: '#d1fae5', curriculumLevel: 13,
    tip: 'Put your tongue near your teeth and make a hissing snake sound!',
    blendWords: ['sun', 'sit', 'sap'],
    words: [
      { word: 'snake', emoji: '🐍', letters: ['s','n','a','k','e'] },
      { word: 'sun',   emoji: '☀️', letters: ['s','u','n'] },
      { word: 'sock',  emoji: '🧦', letters: ['s','o','c','k'] },
      { word: 'star',  emoji: '⭐', letters: ['s','t','a','r'] },
      { word: 'soup',  emoji: '🍲', letters: ['s','o','u','p'] },
      { word: 'seed',  emoji: '🌱', letters: ['s','e','e','d'] },
      { word: 'sail',  emoji: '⛵', letters: ['s','a','i','l'] },
      { word: 'sit',   emoji: '🪑', letters: ['s','i','t'] },
    ],
  },
  {
    key: 'r', label: '/r/', phonemeClass: 'rhotic',
    emoji: '🌈', color: '#c084fc', colorLight: '#f3e8ff', curriculumLevel: 14,
    tip: "Curl your tongue up a little and pull it back — don't touch anything!",
    blendWords: ['red', 'run', 'rip'],
    words: [
      { word: 'rainbow', emoji: '🌈', letters: ['r','a','i','n','b','o','w'] },
      { word: 'rabbit',  emoji: '🐰', letters: ['r','a','b','b','i','t'] },
      { word: 'rocket',  emoji: '🚀', letters: ['r','o','c','k','e','t'] },
      { word: 'rose',    emoji: '🌹', letters: ['r','o','s','e'] },
      { word: 'ring',    emoji: '💍', letters: ['r','i','n','g'] },
      { word: 'rain',    emoji: '🌧️', letters: ['r','a','i','n'] },
      { word: 'robot',   emoji: '🤖', letters: ['r','o','b','o','t'] },
      { word: 'red',     emoji: '🔴', letters: ['r','e','d'] },
    ],
  },
];

export const soundsMap = Object.fromEntries(sounds.map(s => [s.key, s]));

// ── Progress helpers ──────────────────────────────────────────────────
const STORAGE_KEY = 'articulation-progress';

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completedSounds: [], totalStars: 0 };
  } catch { return { completedSounds: [], totalStars: 0 }; }
}

export function saveProgress(p) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch {}
}

export function markComplete(soundKey, stars = 3) {
  const p = loadProgress();
  if (!p.completedSounds.includes(soundKey)) p.completedSounds.push(soundKey);
  p.totalStars = (p.totalStars || 0) + stars;
  saveProgress(p);
  return p;
}

export function getUnlocked(completedSounds) {
  const set = new Set();
  for (let i = 0; i < CURRICULUM_ORDER.length; i++) {
    if (i === 0) { set.add(CURRICULUM_ORDER[i]); continue; }
    if (completedSounds.includes(CURRICULUM_ORDER[i - 1])) set.add(CURRICULUM_ORDER[i]);
  }
  return set;
}

export function getNextInCurriculum(currentKey, completedSounds) {
  const idx = CURRICULUM_ORDER.indexOf(currentKey);
  if (idx === -1 || idx >= CURRICULUM_ORDER.length - 1) return null;
  return completedSounds.includes(currentKey) ? CURRICULUM_ORDER[idx + 1] : null;
}

// ── Encouragements ───────────────────────────────────────────────────
const CORRECT = [
  { text: 'Amazing! 🌟', color: '#f59e0b' },
  { text: 'You did it! ⭐', color: '#f59e0b' },
  { text: 'Wow! Super! 🎉', color: '#ec4899' },
  { text: 'Fantastic! 🏆', color: '#7c3aed' },
  { text: "You're a star! ⭐", color: '#f59e0b' },
  { text: 'Excellent! 🎊', color: '#16a34a' },
  { text: 'Brilliant! ✨', color: '#f59e0b' },
];
const TRY_AGAIN = [
  { text: 'Good try! 💪', color: '#3b82f6' },
  { text: 'Keep going! 🚀', color: '#7c3aed' },
  { text: 'Almost there! ✨', color: '#0d9488' },
  { text: 'You can do it! 💫', color: '#16a34a' },
];
const rand = arr => arr[Math.floor(Math.random() * arr.length)];
export const randomCorrect = () => rand(CORRECT);
export const randomTryAgain = () => rand(TRY_AGAIN);
