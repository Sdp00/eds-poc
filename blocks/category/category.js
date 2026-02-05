import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* create a container for the cards */
  const ul = document.createElement('ul');
  
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('category-card');
    
    // Move all content from the row into the list item
    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }

    // Optimize images found in the card
    li.querySelectorAll('img').forEach((img) => {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
      img.closest('picture').replaceWith(optimizedPic);
    });

    // Wrap the text (non-image) parts in a div for styling
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('category-card-text');
    [...li.children].forEach((child) => {
      if (!child.querySelector('picture')) {
        textWrapper.append(child);
      }
    });
    li.append(textWrapper);
    
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}