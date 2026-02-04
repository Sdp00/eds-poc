import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('div');
  ul.className = 'brands-grid';
  [...block.children].forEach((row) => {
    [...row.children].forEach((card) => {
      card.className = 'brand-card';
      ul.append(card);
    });
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const newPic = createOptimizedPicture(img.src, img.alt, false);
    const newImg = newPic.querySelector('img');
    newImg.width = img.width;
    newImg.height = img.height;
    newImg.className = 'brand-image';
    img.closest('picture').replaceWith(newPic);
  });
  block.replaceChildren(ul);
}
