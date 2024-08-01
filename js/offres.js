document.addEventListener("DOMContentLoaded", function() {
    // Redirection vers la page de la langue de l'utilisateur
    const manual = document.cookie.split('; ').find(row => row.startsWith('user_language_preference='))?.split('=')[1];

    if (!manual) {
        const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
        const currentUrl = window.location.href;

        if (userLang === "en" && currentUrl !== "https://en.gemsync.xyz/offers") {
            window.location.replace("https://en.gemsync.xyz/offers");
        } else if (userLang !== "en" && currentUrl !== "https://gemsync.xyz/offres") {
            window.location.replace("https://gemsync.xyz/offres");
        }
    }

    // Gérer l'en-tête sticky
    window.addEventListener('scroll', function() {
        document.querySelector('header').classList.toggle('sticky', window.scrollY > 0);
    });
});

function toggleMenu() {
    document.querySelector('.toggle').classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
}
