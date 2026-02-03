/**
 * Volume Block (UI only)
 * Pure slider component
 * EDS-safe (builds markup dynamically)
 */

export default function decorate(block) {

  // Build UI inside block (EDS style)
  block.innerHTML = `
    <div class="volume-slider-wrapper">
      <span class="volume-icon">🔊</span>
      <input type="range" min="0" max="100" value="100" step="1">
      <span class="volume-value">100%</span>
    </div>
  `;

  const slider = block.querySelector('input');
  const valueText = block.querySelector('.volume-value');

  // update text on move
  slider.addEventListener('input', () => {
    const value = slider.value;
    valueText.textContent = value + '%';

    // 🔥 optional: dispatch event so other components can listen
    block.dispatchEvent(
      new CustomEvent('volumechange', { detail: value })
    );
  });
}
