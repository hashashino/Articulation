// Simple cartoon front-view mouth diagrams — what YOUR mouth looks like from outside
// Big, bold, colorful SVGs a 5-year-old can understand and copy in a mirror

function lipsSVG(mouthPath, insideFill, teeth, tongue, label, accentColor) {
  return `
<svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg"
  style="width:100%;max-width:240px;display:block;margin:0 auto;filter:drop-shadow(0 3px 8px rgba(0,0,0,.12))">
  <!-- Face -->
  <ellipse cx="110" cy="68" rx="105" ry="58" fill="#fde68a"/>
  ${insideFill}
  ${teeth}
  ${tongue}
  ${mouthPath}
  <!-- Label banner -->
  <rect x="15" y="110" width="190" height="18" rx="9" fill="${accentColor}" opacity=".9"/>
  <text x="110" y="123" font-size="11" font-weight="900" fill="white"
    text-anchor="middle" font-family="system-ui,sans-serif">${label}</text>
</svg>`;
}

// ── Individual mouth positions ──────────────────────────────────────────────

function bilabialSVG(c) {
  // Lips PRESSED together — key: the horizontal line where lips meet
  return lipsSVG(
    // Lips (upper curve + lower curve meeting at center)
    `<path d="M 25 67 Q 70 47 110 53 Q 150 47 195 67" fill="none"
       stroke="#c2410c" stroke-width="5" stroke-linecap="round"/>
     <path d="M 25 67 Q 110 90 195 67 Q 150 105 110 108 Q 70 105 25 67" fill="#f87171"/>
     <path d="M 25 67 Q 110 88 195 67" fill="none"
       stroke="#c2410c" stroke-width="4" stroke-linecap="round"/>
     <!-- Highlight: lips pressed shut -->
     <ellipse cx="110" cy="67" rx="88" ry="6" fill="${c}" opacity=".35"/>
     <line x1="25" y1="67" x2="195" y2="67" stroke="${c}" stroke-width="3" opacity=".6"/>`,
    '', '', '', // no inside/teeth/tongue
    'PRESS LIPS TOGETHER', c
  );
}

function alveolarSVG(c) {
  // Open mouth, tongue tip touches just behind upper teeth
  return lipsSVG(
    // Lips
    `<path d="M 30 58 Q 70 40 110 46 Q 150 40 190 58" fill="none"
       stroke="#c2410c" stroke-width="5" stroke-linecap="round"/>
     <path d="M 30 58 Q 110 47 190 58" fill="#f87171" opacity=".7"/>
     <path d="M 30 90 Q 110 106 190 90" fill="#f87171"/>
     <path d="M 30 90 Q 110 104 190 90" fill="none"
       stroke="#c2410c" stroke-width="4" stroke-linecap="round"/>`,
    // Inside mouth (dark)
    `<ellipse cx="110" cy="74" rx="70" ry="30" fill="#1f2937"/>`,
    // Upper teeth
    `<rect x="45" y="58" width="130" height="16" rx="5" fill="white" stroke="#d1d5db" stroke-width="1.5"/>
     <line x1="67" y1="58" x2="67" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="89" y1="58" x2="89" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="110" y1="58" x2="110" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="131" y1="58" x2="131" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="153" y1="58" x2="153" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>`,
    // Tongue tip touching just behind teeth
    `<path d="M 55 90 Q 110 65 165 90 Q 110 98 55 90" fill="#fb923c"/>
     <ellipse cx="110" cy="72" rx="14" ry="10" fill="${c}" stroke="#9a3412" stroke-width="2.5"/>
     <!-- Arrow pointing at tongue tip -->
     <text x="145" y="70" font-size="18" fill="${c}">↑</text>`,
    'TONGUE TIP UP!', c
  );
}

function velarSVG(c) {
  // Open mouth, tongue back raised — show a dotted arch at back
  return lipsSVG(
    `<path d="M 30 58 Q 70 40 110 46 Q 150 40 190 58" fill="none"
       stroke="#c2410c" stroke-width="5" stroke-linecap="round"/>
     <path d="M 30 58 Q 110 47 190 58" fill="#f87171" opacity=".7"/>
     <path d="M 30 90 Q 110 106 190 90" fill="#f87171"/>
     <path d="M 30 90 Q 110 104 190 90" fill="none"
       stroke="#c2410c" stroke-width="4" stroke-linecap="round"/>`,
    `<ellipse cx="110" cy="74" rx="70" ry="30" fill="#1f2937"/>`,
    `<rect x="45" y="58" width="130" height="16" rx="5" fill="white" stroke="#d1d5db" stroke-width="1.5"/>
     <line x1="67" y1="58" x2="67" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="89" y1="58" x2="89" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="110" y1="58" x2="110" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="131" y1="58" x2="131" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="153" y1="58" x2="153" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>`,
    // Tongue with raised BACK, low tip
    `<path d="M 45 90 Q 75 85 100 82 Q 130 79 165 62" fill="#fb923c" stroke="#ea580c" stroke-width="2"/>
     <path d="M 45 90 Q 110 98 165 90 Q 165 62 130 79 Q 75 85 45 90" fill="#fb923c"/>
     <!-- Highlight back hump -->
     <ellipse cx="148" cy="70" rx="18" ry="12" fill="${c}" opacity=".5" stroke="${c}" stroke-width="2.5"/>
     <text x="165" y="62" font-size="18" fill="${c}">↑</text>`,
    'BACK OF TONGUE UP!', c
  );
}

function labiodentSVG(c) {
  // Upper teeth resting ON lower lip
  return lipsSVG(
    // Upper lip normal, lower lip pulled in
    `<path d="M 30 60 Q 70 42 110 48 Q 150 42 190 60" fill="none"
       stroke="#c2410c" stroke-width="5" stroke-linecap="round"/>
     <path d="M 30 60 Q 110 50 190 60" fill="#f87171" opacity=".6"/>
     <!-- Lower lip pulled inward under teeth -->
     <path d="M 45 78 Q 110 96 175 78 Q 145 105 110 108 Q 75 105 45 78" fill="#f87171"/>`,
    // Small mouth opening
    `<ellipse cx="110" cy="70" rx="65" ry="18" fill="#1f2937"/>`,
    // Upper teeth extending DOWN to touch lower lip
    `<rect x="48" y="60" width="124" height="20" rx="5" fill="white" stroke="#d1d5db" stroke-width="1.5"/>
     <line x1="70" y1="60" x2="70" y2="80" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="92" y1="60" x2="92" y2="80" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="110" y1="60" x2="110" y2="80" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="128" y1="60" x2="128" y2="80" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="150" y1="60" x2="150" y2="80" stroke="#e5e7eb" stroke-width="1.5"/>
     <!-- Highlight: teeth touching lip line -->
     <line x1="48" y1="80" x2="172" y2="80" stroke="${c}" stroke-width="3.5" opacity=".8"/>`,
    '',
    'TOP TEETH ON LOWER LIP!', c
  );
}

function sibilantSVG(c) {
  // Teeth almost closed, tiny gap — air goes through
  return lipsSVG(
    `<path d="M 30 58 Q 70 42 110 47 Q 150 42 190 58" fill="none"
       stroke="#c2410c" stroke-width="5" stroke-linecap="round"/>
     <path d="M 30 58 Q 110 50 190 58" fill="#f87171" opacity=".6"/>
     <path d="M 30 82 Q 110 95 190 82" fill="#f87171"/>
     <path d="M 30 82 Q 110 93 190 82" fill="none"
       stroke="#c2410c" stroke-width="4" stroke-linecap="round"/>`,
    // Very narrow mouth opening
    `<rect x="44" y="67" width="132" height="10" rx="5" fill="#1f2937"/>`,
    // Upper teeth
    `<rect x="44" y="58" width="132" height="14" rx="4" fill="white" stroke="#d1d5db" stroke-width="1.5"/>
     <line x1="66" y1="58" x2="66" y2="72" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="88" y1="58" x2="88" y2="72" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="110" y1="58" x2="110" y2="72" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="132" y1="58" x2="132" y2="72" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="154" y1="58" x2="154" y2="72" stroke="#e5e7eb" stroke-width="1.5"/>
     <!-- Lower teeth -->
     <rect x="44" y="72" width="132" height="12" rx="4" fill="white" stroke="#d1d5db" stroke-width="1.5"/>
     <!-- Highlight gap -->
     <line x1="44" y1="72" x2="176" y2="72" stroke="${c}" stroke-width="2.5" opacity=".8"/>`,
    // Tiny bit of tongue visible
    `<rect x="68" y="74" width="84" height="5" rx="3" fill="#fb923c" opacity=".7"/>`,
    'TINY GAP — AIR GOES THROUGH!', c
  );
}

function glottalSVG(c) {
  // Wide open mouth, nothing blocking — just breathe!
  return lipsSVG(
    `<path d="M 25 55 Q 70 34 110 40 Q 150 34 195 55" fill="none"
       stroke="#c2410c" stroke-width="5" stroke-linecap="round"/>
     <path d="M 25 55 Q 110 44 195 55" fill="#f87171" opacity=".7"/>
     <path d="M 25 96 Q 110 115 195 96 Q 150 110 110 112 Q 70 110 25 96" fill="#f87171"/>
     <path d="M 25 96 Q 110 113 195 96" fill="none"
       stroke="#c2410c" stroke-width="4" stroke-linecap="round"/>`,
    // Big open mouth
    `<ellipse cx="110" cy="76" rx="80" ry="38" fill="#1f2937"/>
     <!-- Breath arrows -->
     <text x="85" y="82" font-size="22" fill="${c}" opacity=".8">💨</text>`,
    // Upper teeth (small)
    `<rect x="52" y="55" width="116" height="14" rx="5" fill="white" stroke="#d1d5db" stroke-width="1.5"/>`,
    // Flat tongue at bottom
    `<path d="M 40 96 Q 110 82 180 96 Q 110 106 40 96" fill="#fb923c" opacity=".8"/>`,
    'OPEN WIDE — BREATHE OUT!', c
  );
}

function glideSVG(c) {
  // Lips ROUNDED into an O shape
  return lipsSVG(
    // O-shaped lip ring — circle opening
    `<!-- Outer lip ring -->
     <ellipse cx="110" cy="70" rx="62" ry="46" fill="#f87171"/>
     <!-- Inner mouth opening -->
     <ellipse cx="110" cy="70" rx="38" ry="26" fill="#1f2937"/>
     <!-- Lip highlight -->
     <ellipse cx="110" cy="70" rx="62" ry="46" fill="none"
       stroke="#c2410c" stroke-width="4"/>
     <ellipse cx="110" cy="70" rx="62" ry="46" fill="none"
       stroke="${c}" stroke-width="3.5" stroke-dasharray="7,4" opacity=".7"/>`,
    '', '', '',
    'ROUND LIPS LIKE AN O!', c
  );
}

function rhoticSVG(c) {
  // Open mouth, tongue tip visible but CURLED UP and back
  return lipsSVG(
    `<path d="M 30 58 Q 70 40 110 46 Q 150 40 190 58" fill="none"
       stroke="#c2410c" stroke-width="5" stroke-linecap="round"/>
     <path d="M 30 58 Q 110 47 190 58" fill="#f87171" opacity=".7"/>
     <path d="M 30 90 Q 110 106 190 90" fill="#f87171"/>
     <path d="M 30 90 Q 110 104 190 90" fill="none"
       stroke="#c2410c" stroke-width="4" stroke-linecap="round"/>`,
    `<ellipse cx="110" cy="74" rx="70" ry="30" fill="#1f2937"/>`,
    `<rect x="45" y="58" width="130" height="16" rx="5" fill="white" stroke="#d1d5db" stroke-width="1.5"/>
     <line x1="67" y1="58" x2="67" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="89" y1="58" x2="89" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="110" y1="58" x2="110" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="131" y1="58" x2="131" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="153" y1="58" x2="153" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>`,
    // Tongue with curled tip — tip visible in MIDDLE, not touching teeth
    `<path d="M 50 90 Q 90 78 110 68 Q 130 78 170 90 Q 110 100 50 90" fill="#fb923c"/>
     <!-- Curled tip highlighted — shown as a little curl in middle -->
     <ellipse cx="110" cy="70" rx="13" ry="10" fill="${c}" opacity=".6" stroke="${c}" stroke-width="2.5"/>
     <path d="M 104 64 Q 110 60 116 64" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
     <text x="140" y="65" font-size="16" fill="${c}">↰</text>`,
    'CURL TONGUE UP AND BACK!', c
  );
}

function postalveolarSVG(c) {
  // Tongue bunched slightly further back than alveolar, lips slightly rounded
  return lipsSVG(
    `<path d="M 30 58 Q 70 40 110 46 Q 150 40 190 58" fill="none"
       stroke="#c2410c" stroke-width="5" stroke-linecap="round"/>
     <path d="M 30 58 Q 110 47 190 58" fill="#f87171" opacity=".7"/>
     <path d="M 30 90 Q 110 106 190 90" fill="#f87171"/>
     <path d="M 30 90 Q 110 104 190 90" fill="none"
       stroke="#c2410c" stroke-width="4" stroke-linecap="round"/>`,
    `<ellipse cx="110" cy="74" rx="70" ry="30" fill="#1f2937"/>`,
    `<rect x="45" y="58" width="130" height="16" rx="5" fill="white" stroke="#d1d5db" stroke-width="1.5"/>
     <line x1="67" y1="58" x2="67" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="89" y1="58" x2="89" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="110" y1="58" x2="110" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="131" y1="58" x2="131" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="153" y1="58" x2="153" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>`,
    // Tongue blade raised and bunched back — wider hump than alveolar
    `<path d="M 45 90 Q 80 80 110 72 Q 140 80 175 90 Q 110 100 45 90" fill="#fb923c"/>
     <ellipse cx="110" cy="74" rx="22" ry="13" fill="${c}" opacity=".5" stroke="${c}" stroke-width="2.5"/>
     <text x="108" y="64" font-size="18" fill="${c}">↑</text>`,
    'TONGUE BUNCHED BACK!', c
  );
}

function affricateSVG(c) {
  // Tongue tip touches alveolar ridge then releases — show both positions with arrow
  return lipsSVG(
    `<path d="M 30 58 Q 70 40 110 46 Q 150 40 190 58" fill="none"
       stroke="#c2410c" stroke-width="5" stroke-linecap="round"/>
     <path d="M 30 58 Q 110 47 190 58" fill="#f87171" opacity=".7"/>
     <path d="M 30 90 Q 110 106 190 90" fill="#f87171"/>
     <path d="M 30 90 Q 110 104 190 90" fill="none"
       stroke="#c2410c" stroke-width="4" stroke-linecap="round"/>`,
    `<ellipse cx="110" cy="74" rx="70" ry="30" fill="#1f2937"/>`,
    `<rect x="45" y="58" width="130" height="16" rx="5" fill="white" stroke="#d1d5db" stroke-width="1.5"/>
     <line x1="67" y1="58" x2="67" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="89" y1="58" x2="89" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="110" y1="58" x2="110" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="131" y1="58" x2="131" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="153" y1="58" x2="153" y2="74" stroke="#e5e7eb" stroke-width="1.5"/>`,
    // Tongue tip touching ridge with release arrow
    `<path d="M 50 90 Q 90 72 130 76 Q 160 78 175 90 Q 110 100 50 90" fill="#fb923c"/>
     <!-- Tongue tip at alveolar ridge -->
     <ellipse cx="100" cy="72" rx="13" ry="9" fill="${c}" stroke="#9a3412" stroke-width="2.5"/>
     <!-- Release arrow -->
     <text x="118" y="70" font-size="16" fill="${c}">→</text>
     <text x="138" y="64" font-size="14" fill="${c}" opacity=".7">sh</text>`,
    'TIP UP, THEN RELEASE!', c
  );
}

function dentalSVG(c) {
  // Tongue tip visible between upper and lower teeth
  return lipsSVG(
    `<path d="M 30 58 Q 70 42 110 47 Q 150 42 190 58" fill="none"
       stroke="#c2410c" stroke-width="5" stroke-linecap="round"/>
     <path d="M 30 58 Q 110 50 190 58" fill="#f87171" opacity=".6"/>
     <path d="M 30 86 Q 110 100 190 86" fill="#f87171"/>
     <path d="M 30 86 Q 110 98 190 86" fill="none"
       stroke="#c2410c" stroke-width="4" stroke-linecap="round"/>`,
    `<ellipse cx="110" cy="72" rx="68" ry="26" fill="#1f2937"/>`,
    // Upper teeth
    `<rect x="46" y="58" width="128" height="14" rx="5" fill="white" stroke="#d1d5db" stroke-width="1.5"/>
     <line x1="68" y1="58" x2="68" y2="72" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="90" y1="58" x2="90" y2="72" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="110" y1="58" x2="110" y2="72" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="130" y1="58" x2="130" y2="72" stroke="#e5e7eb" stroke-width="1.5"/>
     <line x1="152" y1="58" x2="152" y2="72" stroke="#e5e7eb" stroke-width="1.5"/>
     <!-- Lower teeth -->
     <rect x="46" y="72" width="128" height="12" rx="4" fill="white" stroke="#d1d5db" stroke-width="1.5"/>`,
    // Tongue tip sticking out BETWEEN teeth
    `<path d="M 70 86 Q 110 68 150 86 Q 110 94 70 86" fill="#fb923c"/>
     <!-- Tongue tip visible between teeth -->
     <ellipse cx="110" cy="72" rx="16" ry="9" fill="${c}" stroke="#9a3412" stroke-width="2.5"/>
     <!-- Arrow pointing at tongue between teeth -->
     <text x="148" y="68" font-size="16" fill="${c}">↑</text>`,
    'TONGUE BETWEEN TEETH!', c
  );
}

// ── Public API ──────────────────────────────────────────────────────────────

const SVG_FNS = {
  bilabial:      bilabialSVG,
  alveolar:      alveolarSVG,
  velar:         velarSVG,
  labiodental:   labiodentSVG,
  sibilant:      sibilantSVG,
  glottal:       glottalSVG,
  glide:         glideSVG,
  rhotic:        rhoticSVG,
  postalveolar:  postalveolarSVG,
  affricate:     affricateSVG,
  dental:        dentalSVG,
};

export function renderMouthSVG(phonemeClass, accentColor = '#8b5cf6') {
  const fn = SVG_FNS[phonemeClass] || bilabialSVG;
  return fn(accentColor);
}
