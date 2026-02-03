/*
  cards.js
  Simple AEM EDS Card component

  HOW IT WORKS
  -------------
  • Author only adds images inside the block
  • JS wraps each image into a card
  • Adds:
      - image
      - blue button
      - hover effect via CSS
*/

export default function decorate(block) {

  // Get all images placed by author inside the block
  const images = [...block.querySelectorAll('img')];

  // Clear original content (EDS pattern)
  block.textContent = '';

  // Main wrapper
  const container = document.createElement('div');
  container.className = 'cards-wrapper';

  images.forEach((img, index) => {

    // ----- Card -----
    const card = document.createElement('div');
    card.className = 'card';

    // ----- Image wrapper -----
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'card-image';

    img.loading = 'lazy'; // performance boost
    imgWrapper.appendChild(img);

    // ----- Button -----
    const btn = document.createElement('button');
    btn.className = 'card-btn';
    btn.textContent = 'View Details';

    // Example click handler
    btn.addEventListener('click', () => {
      console.log(`Clicked card ${index + 1}`);
    });

    // Build card
    card.append(imgWrapper, btn);

    // Add to container
    container.appendChild(card);
  });

  block.appendChild(container);
}
