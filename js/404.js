document.addEventListener('DOMContentLoaded', () => {
    // Redirection vers la page de la langue de l'utilisateur
    if (!document.cookie.includes('user_language_preference=')) {
        if ((navigator.language || navigator.userLanguage).startsWith('en')) {
            window.location.replace(window.location.href !== 'https://en.gemsync.xyz/404' ? 'https://en.gemsync.xyz/404' : window.location.href);
        } else {
            window.location.replace(window.location.href !== 'https://gemsync.xyz/404' ? 'https://gemsync.xyz/404' : window.location.href);
        }
    }
});
