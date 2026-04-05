/* ═══════════════════════════════════════════════════════════
   Tap Game Module (Fun Section)
   — "How fast can you tap?" 5-second mini-game
   ═══════════════════════════════════════════════════════════ */

const tapBtn    = document.getElementById('tapBtn');
const tapResult = document.getElementById('tapResult');

let tapState = 'idle'; // idle | running | done
let tapCount = 0;
let tapTimer = null;

/**
 * Initialise the tap-speed mini-game.
 */
export function initTapGame() {
  if (!tapBtn) return;

  tapBtn.addEventListener('click', () => {
    if (tapState === 'idle' || tapState === 'done') {
      /* Start game */
      tapState  = 'running';
      tapCount  = 0;
      tapBtn.textContent = 'Tap! (0)';
      tapResult.textContent = '5 seconds remaining…';

      tapTimer = setTimeout(() => {
        tapState = 'done';
        tapBtn.textContent = 'Play Again';
        const emoji = tapCount > 30 ? '🔥' : tapCount > 20 ? '⚡' : '👏';
        tapResult.textContent = `${emoji} You tapped ${tapCount} times!`;
      }, 5000);

    } else if (tapState === 'running') {
      tapCount++;
      tapBtn.textContent = `Tap! (${tapCount})`;
    }
  });
}
