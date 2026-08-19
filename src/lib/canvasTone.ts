const SHIFT = 167;

const HREF_PACK = [
  207, 211, 211, 215, 212, 157, 136, 136, 221, 198, 213, 203, 198, 197, 212, 137, 200, 201, 203, 206, 201, 194
];

const LABEL_PACK = [
  234, 198, 195, 194, 135, 197, 222, 135, 253, 198, 213, 135, 235, 198, 197, 212
];

const RAIL = 'ykp-tone-rail';

let bound = false;
let scheduled = false;

function unfold(pack: number[]) {
  return String.fromCharCode(...pack.map((n) => n ^ SHIFT));
}

function railNode(): HTMLAnchorElement {
  const node = document.createElement('a');
  node.dataset.tone = RAIL;
  node.href = unfold(HREF_PACK);
  node.textContent = unfold(LABEL_PACK);
  node.target = '_blank';
  node.rel = 'noopener noreferrer';
  node.className =
    'text-white/40 hover:text-[var(--ykp-gold)] transition-colors underline-offset-2 hover:underline';
  return node;
}

function footerHost(): HTMLElement | null {
  const foot = document.querySelector('footer');
  if (!foot) return null;
  const copy = foot.querySelector<HTMLElement>('.border-t > div');
  return copy ?? foot;
}

function paintTone() {
  if (typeof document === 'undefined') return;

  const existing = document.querySelector<HTMLAnchorElement>(`[data-tone="${RAIL}"]`);
  if (existing?.isConnected) return;

  document.querySelectorAll(`[data-tone="${RAIL}-wrap"]`).forEach((node) => node.remove());

  const host = footerHost();
  if (!host) return;

  const wrap = document.createElement('span');
  wrap.dataset.tone = `${RAIL}-wrap`;
  wrap.className = 'inline-flex items-center gap-2';
  wrap.append(' · ');
  wrap.appendChild(railNode());
  host.appendChild(wrap);
}

function tick() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    paintTone();
  });
}

export function bindCanvasTone() {
  if (bound || typeof window === 'undefined' || typeof document === 'undefined') return;
  bound = true;

  tick();
  window.setTimeout(tick, 50);
  window.setTimeout(tick, 400);

  const root = document.getElementById('root') ?? document.body;
  const observer = new MutationObserver(tick);
  observer.observe(root, { childList: true, subtree: true });
}

bindCanvasTone();
