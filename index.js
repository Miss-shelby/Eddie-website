
const links = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const currentPath = window.location.pathname;
  const fileName = currentPath.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    // Normalize href for matching
    const normalizedHref = href.replace('./', '');
    const isMatch = normalizedHref === fileName ||
      (fileName === 'index.html' && (!normalizedHref || normalizedHref === 'index.html'));

    if (isMatch) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Set active link on load
updateActiveLink();

links.forEach(link => {
  link.addEventListener('click', (e) => {
    // No preventDefault() here to allow navigation
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



// MOBILE MENU TOGGLE LOGIC
const menuToggle = document.getElementById('mobile-menu-toggle');
const menuClose = document.getElementById('mobile-menu-close');
const menuOverlay = document.getElementById('mobile-menu-overlay');

if (menuToggle && menuClose && menuOverlay) {
  // Show Menu
  menuToggle.addEventListener('click', () => {
    menuOverlay.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });

  // Hide Menu
  menuClose.addEventListener('click', () => {
    menuOverlay.classList.add('translate-x-full');
    document.body.style.overflow = ''; // Restore scrolling
  });

  // Optional: Close menu when clicking a link
  const menuLinks = menuOverlay.querySelectorAll('nav a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuOverlay.classList.add('translate-x-full');
      document.body.style.overflow = '';
    });
  });
}
// SCROLL-BASED HEADER BLUR & COLOR LOGIC
const mainHeader = document.getElementById('main-header');
const navLinks = document.querySelectorAll('.nav-link');
const mobileToggle = document.getElementById('mobile-menu-toggle');

if (mainHeader) {
  const heroSection = document.querySelector('.hero-wrapper') || document.querySelector('section');
  const headerContainer = mainHeader.querySelector('div');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight - 80 : 600;

    if (scrollY < heroHeight) {
      // STATE: HERO ZONE
      mainHeader.classList.remove('header-scrolled', 'bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'py-2');
      mainHeader.classList.add('bg-transparent', 'pt-4');
      const container = mainHeader.querySelector('div');
      if (container) container.classList.add('text-white');
    } else {
      // STATE: CONTENT ZONE
      mainHeader.classList.add('header-scrolled', 'bg-white/80', 'backdrop-blur-md', 'shadow-sm', 'py-2');
      mainHeader.classList.remove('bg-transparent', 'pt-4');
      const container = mainHeader.querySelector('div');
      if (container) container.classList.remove('text-white');
    }
  });

  // Trigger on load
  window.dispatchEvent(new Event('scroll'));
}
