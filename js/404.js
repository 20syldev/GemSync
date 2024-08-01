document.addEventListener("DOMContentLoaded", function() {
    // Redirection vers la page de la langue de l'utilisateur
    const manual = document.cookie.split('; ').find(row => row.startsWith('user_language_preference='))?.split('=')[1];

    if (!manual) {
        const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
        const currentUrl = window.location.href;

        if (userLang === "en" && currentUrl !== "https://en.gemsync.xyz/404") {
            window.location.replace("https://en.gemsync.xyz/404");
        } else if (userLang !== "en" && currentUrl !== "https://gemsync.xyz/404") {
            window.location.replace("https://gemsync.xyz/404");
        }
    }
});
