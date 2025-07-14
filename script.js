document.addEventListener('DOMContentLoaded', function() {
  // Burger Menu
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);

  function toggleMenu() {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }

  burgerMenu.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 100);
  });

  // Animate on scroll using IntersectionObserver
  const animateElements = document.querySelectorAll('.animate');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('show');

        // Add delay if part of group
        if (el.parentElement.classList.contains('animate-group')) {
          el.parentElement.querySelectorAll('.animate').forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.15}s`;
          });
        }
      } else {
        el.classList.remove('show');
        el.style.transitionDelay = '0s';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  animateElements.forEach(el => observer.observe(el));

  // Floating elements generation
  const floatingContainer = document.querySelector('.floating-elements');
  for (let i = 0; i < 12; i++) {
    const size = Math.random() * 200 + 100;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 20 + 10;
    const color = i % 3 === 0 ? 'var(--accent-color)' :
                 i % 2 === 0 ? 'var(--primary-color)' : 'var(--secondary-color)';

    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.top = `${posY}%`;
    element.style.left = `${posX}%`;
    element.style.animationDelay = `${delay}s`;
    element.style.animationDuration = `${duration}s`;
    element.style.opacity = Math.random() * 0.15 + 0.05;
    element.style.background = `linear-gradient(135deg, ${color}, rgba(255,255,255,0.3))`;

    floatingContainer.appendChild(element);
  }

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('active', window.scrollY > 300);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });

      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Active nav based on scroll
  const sections = document.querySelectorAll('section');
  const navLinksAll = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      if (window.pageYOffset >= top - 300) {
        current = section.getAttribute('id');
      }
    });

    navLinksAll.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Reset animations on resize
  window.addEventListener('resize', () => {
    animateElements.forEach(el => {
      el.classList.remove('show');
      el.style.transitionDelay = '0s';
      requestAnimationFrame(() => {
        observer.unobserve(el);
        observer.observe(el);
      });
    });
  });
});
