export default function decorate(block) {

  // 🎯 Inject HTML dynamically (EDS style)
  block.innerHTML = `
    <div class="volume-wrapper">
      <audio src="/media/sample.mp3" controls></audio>

      <div class="volume-slider-wrapper">
        <span class="volume-icon">🔊</span>
        <input type="range" min="0" max="100" value="70" step="1">
        <span class="volume-value">70%</span>
      </div>
    </div>
  `;

  const audio = block.querySelector('audio');
  const slider = block.querySelector('input');
  const valueText = block.querySelector('.volume-value');

  audio.volume = 0.7;

  slider.addEventListener('input', () => {
    const volume = slider.value;
    valueText.textContent = volume + '%';
    audio.volume = volume / 100;
  });
}
