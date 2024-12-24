window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach((section) => {
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add('visible');
        }
    });
});
