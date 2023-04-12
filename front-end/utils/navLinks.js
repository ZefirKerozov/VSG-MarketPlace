// Add and remove class "active" to active navigation link

const navLinks = Array.from(document.querySelectorAll('li a'));
const currentURL = new URL(document.URL);
navLinks.filter(x => x.pathname === currentURL.pathname)
        .forEach(x => x.classList.add('active'));