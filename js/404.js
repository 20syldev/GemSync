// Récupérer la langue du navigateur et l'URL
const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
const url = userLang === 'en' ? 'https://en.gemsync.xyz/404' : 'https://gemsync.xyz/404';

document.addEventListener('DOMContentLoaded', () => {
    // Redirection et gestion de l'en-tête sticky
    if (!document.cookie.includes('user_language_preference=') && window.location.href !== url) {
        window.location.replace(url);
    }
});