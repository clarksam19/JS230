document.addEventListener('DOMContentLoaded', () => {
  let siblingImages = document.querySelectorAll('ul img');
  siblingImages.forEach(img => {
    img.addEventListener('click', e => {
      let figure = document.querySelector('figure');
      let display = figure.firstElementChild;
      if (e.target.getAttribute('data-order') !== display.getAttribute('data-order')) {
        let clone = e.target.cloneNode();
        figure.replaceChild(clone, display);
        toggleClassBetweenSiblings(e.target, siblingImages, 'active');
      }
    });
  });
});

function toggleClassBetweenSiblings(elem, siblings, className) {
  siblings.forEach(elem => {
    elem.classList.remove(className);
  });

  elem.classList.add(className);
}

