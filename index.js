
const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Carousel Navigation Logic
function initCarousels() {
  const carousels = document.querySelectorAll('.js-carousel');

  carousels.forEach(carousel => {
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const slides = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function updateButtonStates() {
      if (prevBtn && nextBtn) {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === slides.length - 1;

        // Add/remove inactive class for styling if needed
        prevBtn.classList.toggle('inactive', currentIndex === 0);
        nextBtn.classList.toggle('inactive', currentIndex === slides.length - 1);
      }
    }

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      updateButtonStates();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          showSlide(currentIndex);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          showSlide(currentIndex);
        }
      });
    }

    // Initial state for this carousel
    showSlide(0);
  });
}

// Initialize all carousels
initCarousels();

// Copy to Clipboard Functionality
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.js-copy-btn');

  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const textToCopy = targetElement.innerText.trim();

        navigator.clipboard.writeText(textToCopy).then(() => {
          // Visual feedback: Change icon to checkmark
          const originalSVG = button.innerHTML;
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B48B78" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          `;

          setTimeout(() => {
            button.innerHTML = originalSVG;
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      }
    });
  });
}

// Initialize copy functionality
initCopyButtons();
