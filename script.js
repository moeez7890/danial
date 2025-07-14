document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Advanced animation observer with reset capability
  const animateElements = document.querySelectorAll('.animate');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        
        // Add delay for grouped animations
        if (entry.target.parentElement.classList.contains('animate-group')) {
          const items = entry.target.parentElement.querySelectorAll('.animate');
          items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.15}s`;
          });
        }
      } else {
        // Reset animation when element leaves viewport
        entry.target.classList.remove('show');
        entry.target.style.transitionDelay = '0s';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observe all animate elements
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Generate floating elements
  const floatingContainer = document.querySelector('.floating-elements');
  for (let i = 0; i < 12; i++) {
    const size = Math.random() * 300 + 100;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 20 + 20;
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
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
      
      // Update active class on nav links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // Update active nav link based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 300) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Reset all animations when page is resized
  window.addEventListener('resize', () => {
    animateElements.forEach(el => {
      el.classList.remove('show');
      el.style.transitionDelay = '0s';
      // Use requestAnimationFrame to ensure the class is removed before re-observing
      requestAnimationFrame(() => {
        observer.unobserve(el);
        observer.observe(el);
      });
    });
  });
});
  const floatingContainer = document.querySelector('.floating-elements');

  for (let i = 0; i < 8; i++) {
    const size = Math.random() * 200 + 100;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 20 + 10;

    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.top = `${posY}%`;
    element.style.left = `${posX}%`;
    element.style.animationDelay = `${delay}s`;
    element.style.animationDuration = `${duration}s`;
    element.style.opacity = Math.random() * 0.2 + 0.1;

    floatingContainer.appendChild(element);
  }

