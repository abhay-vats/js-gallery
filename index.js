// Setup gallery function
function Gallery(gallery) {
  if (!gallery) return;

  // Select elements
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const next = modal.querySelector('.next');
  const previous = modal.querySelector('.prev');
  let currentImage;

  // Handlers
  function showImage(el) {
    if (!el) return;

    currentImage = el;

    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').textContent = el.title;
    modal.querySelector('p').textContent = el.dataset.description;

    openModal();
  }

  function openModal() {
    if (modal.matches('.open')) return;
    modal.classList.add('open');

    window.addEventListener('keyup', handleKeyUp);
    next.addEventListener('click', showNextImage);
    previous.addEventListener('click', showPreviousImage);
  }

  function closeModal() {
    modal.classList.remove('open');

    window.removeEventListener('keyup', handleKeyUp);
    next.removeEventListener('click', showNextImage);
    previous.removeEventListener('click', showPreviousImage);
  }

  function handleOutsideClick(e) {
    if (e.target === e.currentTarget) closeModal();
  }

  function handleKeyUp(e) {
    switch (e.key) {
      case 'Escape':
        return closeModal();
      case 'ArrowRight':
        return showNextImage();
      case 'ArrowLeft':
        return showPreviousImage();
    }
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPreviousImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  // Event listeners
  images.forEach((image) => {
    image.addEventListener('click', (e) => showImage(e.currentTarget));
    image.addEventListener(
      'keyup',
      (e) => e.key === 'Enter' && showImage(e.currentTarget)
    );
  });
  modal.addEventListener('click', handleOutsideClick);
}

// Create galleries
Gallery(document.querySelector('.gallery1'));
Gallery(document.querySelector('.gallery2'));
