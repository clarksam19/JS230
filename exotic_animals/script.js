document.addEventListener('DOMContentLoaded', () => {
  let images = document.querySelectorAll('img');
  let captions = document.querySelectorAll('figcaption');

  images.forEach(image => {
    image.onmouseenter = (e) => {
      let timer; 
      timer = setTimeout(() => {
        if (!(e.target.nextElementSibling.classList['tooltip'])) {
          e.target.nextElementSibling.classList.add('tooltip');
        }
      }, 2000);
      e.target.onmouseleave = (e) => {
        clearTimeout(timer);
        e.target.nextElementSibling.classList.remove('tooltip');
      }
    }
  })
})