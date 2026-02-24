
const links = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const currentPath = window.location.pathname;
  const fileName = currentPath.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    // Check if href matches fileName (handling empty/root as index.html)
    // Removed '#' from the index.html fallback to avoid matching 'Businesses' links
    const isMatch = href === fileName || (fileName === 'index.html' && (href === './' || href === ''));

    if (isMatch) {
      link.classList.add('active');
      link.classList.remove('text-gray-400');
    } else {
      link.classList.remove('active');
      // Only re-add text-gray-400 if it's a structural link, not home
      if (link.textContent.trim() !== 'Home') {
        link.classList.add('text-gray-400');
      }
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
      // STATE: HERO ZONE (Transparent BG, White Text)
      mainHeader.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
      mainHeader.classList.add('bg-transparent');

      if (headerContainer) {
        headerContainer.classList.add('text-white');
        headerContainer.classList.remove('text-brand-dark');
      }

      navLinks.forEach(link => {
        if (!link.classList.contains('active')) {
          link.classList.add('text-gray-400');
          link.classList.remove('text-brand-dark', 'text-white');
        } else {
          link.classList.add('text-white');
          link.classList.remove('text-brand-dark', 'text-gray-400');
        }
      });
      if (mobileToggle) {
        mobileToggle.classList.add('text-white');
        mobileToggle.classList.remove('text-brand-dark');
      }

    } else {
      // STATE: CONTENT ZONE (White BG, Dark Text)
      mainHeader.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm','pb-3');
      mainHeader.classList.remove('bg-transparent');

      if (headerContainer) {
        headerContainer.classList.add('text-brand-dark');
        headerContainer.classList.remove('text-white');
      }
      navLinks.forEach(link => {
        link.classList.add('text-brand-dark');
        link.classList.remove('text-gray-400', 'text-white');
      });
      if (mobileToggle) {
        mobileToggle.classList.add('text-brand-dark');
        mobileToggle.classList.remove('text-white');
      }
    }
  });

  // Trigger on load
  window.dispatchEvent(new Event('scroll'));
}
