// Récupérer la langue du navigateur et l'URL
const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
const url = userLang === 'en' ? 'https://en.gemsync.xyz/gcu' : 'https://gemsync.xyz/cgu';

document.addEventListener('DOMContentLoaded', () => {
    // Redirection et gestion de l'en-tête sticky
    if (!document.cookie.includes('user_language_preference=') && window.location.href !== url) {
        window.location.replace(url);
    }
    document.querySelector('header').classList.toggle('sticky', window.scrollY > 0);
});

// Gérer l'en-tête sticky
window.addEventListener('scroll', () => {
    document.querySelector('header').classList.toggle('sticky', window.scrollY > 0);
});

// Fonction pour la version mobile
function toggleMenu() {
    document.querySelector('.toggle').classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
}
