// Récupérer la langue du navigateur et l'URL
const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
const url = userLang === 'en' ? 'https://en.gemsync.xyz/store' : 'https://gemsync.xyz/store';

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

// Afficher les conditions de nom de domaine
document.querySelectorAll('.domain').forEach(box => {
    const info = document.createElement('p');
    info.className = 'domain-info';
    info.textContent = userLang === 'en'
        ? 'Depending on availability and pack price.'
        : 'Selon disponibilité et dans la limite du prix du pack.';
    box.appendChild(info);

    box.addEventListener('mouseover', () => {
        info.classList.add('show');
    });
    box.addEventListener('mouseout', () => {
        info.classList.remove('show');
    });
});

// Fonction pour la version mobile
function toggleMenu() {
    document.querySelector('.toggle').classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
}
