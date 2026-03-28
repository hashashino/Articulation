// Animated SVG mouth cross-section diagrams per phoneme class
// Returns an SVG string showing the articulator positions

const CONFIGS = {
  bilabial: {
    label: 'Lips press together',
    upperLipY: 148, lowerLipY: 152,
    tongueD: 'M 70 200 Q 130 195 185 192 Q 220 190 245 188',
    tipCx: 248, tipCy: 186,
    highlight: 'lips',
    arrowLabel: 'Lips together!',
    arrowX: 160, arrowY: 90,
  },
  alveolar: {
    label: 'Tongue tip touches ridge behind top teeth',
    upperLipY: 132, lowerLipY: 168,
    tongueD: 'M 70 200 Q 130 185 185 160 Q 215 145 242 132',
    tipCx: 245, tipCy: 128,
    highlight: 'tip',
    arrowLabel: 'Tongue tip up!',
    arrowX: 258, arrowY: 100,
  },
  velar: {
    label: 'Back of tongue rises to soft palate',
    upperLipY: 132, lowerLipY: 168,
    tongueD: 'M 70 200 Q 120 195 162 172 Q 198 152 218 124',
    tipCx: 180, tipCy: 196,
    highlight: 'body',
    arrowLabel: 'Tongue back up!',
    arrowX: 215, arrowY: 96,
  },
  labiodental: {
    label: 'Upper teeth rest on lower lip',
    upperLipY: 134, lowerLipY: 158,
    tongueD: 'M 70 200 Q 130 195 185 192 Q 220 190 245 188',
    tipCx: 248, tipCy: 186,
    highlight: 'teeth',
    arrowLabel: 'Teeth on lip!',
    arrowX: 205, arrowY: 106,
  },
  sibilant: {
    label: 'Narrow groove, tongue near (not touching) teeth',
    upperLipY: 133, lowerLipY: 167,
    tongueD: 'M 70 200 Q 130 188 185 164 Q 218 150 244 138',
    tipCx: 248, tipCy: 134,
    highlight: 'tip',
    arrowLabel: 'Almost touching!',
    arrowX: 260, arrowY: 104,
  },
  glottal: {
    label: 'Open mouth, breathe through throat',
    upperLipY: 122, lowerLipY: 178,
    tongueD: 'M 70 210 Q 130 205 185 202 Q 220 200 248 198',
    tipCx: 251, tipCy: 196,
    highlight: 'none',
    arrowLabel: 'Open wide!',
    arrowX: 150, arrowY: 78,
  },
  glide: {
    label: 'Lips rounded like blowing bubbles',
    upperLipY: 140, lowerLipY: 160,
    tongueD: 'M 70 200 Q 130 192 185 188 Q 218 185 245 184',
    tipCx: 248, tipCy: 182,
    highlight: 'lips',
    arrowLabel: 'Round lips!',
    arrowX: 148, arrowY: 88,
  },
  rhotic: {
    label: 'Tongue curls up and back, sides raised',
    upperLipY: 130, lowerLipY: 170,
    tongueD: 'M 70 200 Q 120 190 164 170 Q 198 154 218 136',
    tipCx: 212, tipCy: 126,
    highlight: 'body',
    arrowLabel: 'Curl back!',
    arrowX: 214, arrowY: 96,
  },
};

export function renderMouthSVG(phonemeClass, accentColor = '#8b5cf6') {
  const c = CONFIGS[phonemeClass] || CONFIGS.bilabial;

  const lipColor = c.highlight === 'lips' ? accentColor : '#f97316';
  const teethColor = '#fffbeb';
  const teethStroke = '#d1d5db';
  const tongueBodyColor = '#fb923c';
  const tongueTipColor = (c.highlight === 'tip' || c.highlight === 'body') ? accentColor : '#ef4444';
  const upperTeethY = c.highlight === 'teeth' ? 118 : 122;
  const palatColor = '#d4a37a';

  // Build teeth rectangles
  const upperTeeth = [0,1,2,3].map(i =>
    `<rect x="${195 + i*14}" y="${upperTeethY}" width="12" height="20" rx="2"
      fill="${c.highlight === 'teeth' ? accentColor : teethColor}" stroke="${teethStroke}" stroke-width="1"/>`
  ).join('');
  const lowerTeeth = [0,1,2,3].map(i =>
    `<rect x="${195 + i*14}" y="158" width="12" height="18" rx="2"
      fill="${teethColor}" stroke="${teethStroke}" stroke-width="1"/>`
  ).join('');

  return `
<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg"
  class="mouth-svg" role="img" aria-label="Mouth diagram: ${c.label}"
  style="animation: diagIn .5s ease-out">
  <style>
    @keyframes diagIn { from { opacity:0; } to { opacity:1; } }
    @keyframes tongueAnimate {
      from { d: path('M 70 200 Q 130 195 185 192 Q 220 190 245 188'); }
      to   { d: path('${c.tongueD}'); }
    }
    @keyframes lipUpper {
      from { cy: 135; } to { cy: ${c.upperLipY}; }
    }
    @keyframes lipLower {
      from { cy: 165; } to { cy: ${c.lowerLipY}; }
    }
    @keyframes tipMove {
      from { cx: 248; cy: 186; }
      to   { cx: ${c.tipCx}; cy: ${c.tipCy}; }
    }
    .tongue-body {
      animation: tongueAnimate .8s ease-out forwards;
      d: path('${c.tongueD}');
    }
    .lip-upper { animation: lipUpper .7s ease-out forwards; cy: ${c.upperLipY}; }
    .lip-lower { animation: lipLower .7s ease-out forwards; cy: ${c.lowerLipY}; }
    .tongue-tip { animation: tipMove .8s ease-out forwards; cx: ${c.tipCx}; cy: ${c.tipCy}; }
  </style>

  <!-- Background -->
  <rect width="320" height="240" rx="16" fill="#fef9f0"/>

  <!-- Palate -->
  <path d="M 60 80 Q 100 55 160 50 Q 220 48 270 70 Q 295 85 300 110 Q 305 135 290 155"
    fill="${palatColor}" stroke="#c8956a" stroke-width="3"/>

  <!-- Alveolar ridge marker -->
  <circle cx="252" cy="118" r="6" fill="${c.highlight === 'tip' || c.highlight === 'teeth' ? accentColor : '#ef4444'}"/>
  <text x="252" y="113" font-size="8" fill="#fff" font-weight="bold" text-anchor="middle">R</text>

  <!-- Upper teeth -->
  ${upperTeeth}
  <!-- Lower teeth -->
  ${lowerTeeth}

  <!-- Tongue body (animated) -->
  <path class="tongue-body" fill="${tongueBodyColor}" stroke="#ea580c" stroke-width="2" stroke-linecap="round"/>
  <!-- Tongue body fill -->
  <path d="${c.tongueD} L 70 220 Z" fill="${tongueBodyColor}" opacity="0.45"/>

  <!-- Tongue tip (animated) -->
  <circle class="tongue-tip" r="8" fill="${tongueTipColor}" stroke="#dc2626" stroke-width="2"/>

  <!-- Lips -->
  <ellipse class="lip-upper" cx="150" rx="100" ry="18" fill="${lipColor}" opacity="0.9"/>
  <ellipse class="lip-lower" cx="150" rx="100" ry="18" fill="${lipColor}" opacity="0.9"/>

  <!-- Arrow label -->
  <rect x="${c.arrowX - 44}" y="${c.arrowY - 14}" width="88" height="20" rx="10"
    fill="${accentColor}" opacity="0.9"/>
  <text x="${c.arrowX}" y="${c.arrowY}" font-size="9" font-weight="bold" fill="white"
    text-anchor="middle" font-family="system-ui, sans-serif">${c.arrowLabel}</text>

  <!-- Bottom label -->
  <text x="160" y="232" font-size="9" fill="#9ca3af" text-anchor="middle"
    font-family="system-ui, sans-serif">${c.label}</text>
</svg>`;
}
