/**
 * EDS Block Script
 * Runs automatically when the block loads
 * `block` = the .volume div (root element)
 */

export default function decorate(block) {

  // 🎯 Grab elements inside THIS block only
  // (scoped queries = best practice in EDS)
  const audio = block.querySelector('audio');
  const slider = block.querySelector('input[type="range"]');
  const valueText = block.querySelector('.volume-value');


  // ===== Set default =====
  audio.volume = slider.value / 100;


  // ===== Slider change =====
  slider.addEventListener('input', () => {
    const volume = slider.value;

    valueText.textContent = volume + '%';

    // HTML audio expects 0 → 1
    audio.volume = volume / 100;
  });

}
