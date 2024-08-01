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

    // Défilement vers la section avec l'ID spécifié
    const sectionID = window.location.hash.substring(1);
    if (sectionID) {
        // Animer le défilement vers la section avec l'ID spécifié
        function scrollToSection() {
            const section = document.getElementById(sectionID);
            if (section) {
                const sectionOffset = section.getBoundingClientRect().top;
                const currentScroll = window.scrollY;
                const duration = 10;
                const startTime = performance.now();
    
                function scrollAnimation(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    const scrollProgress = Math.min(elapsedTime / duration, 1);
                    const easedProgress = easeOutCubic(scrollProgress);
                    const scrollTo = currentScroll + (sectionOffset * easedProgress);
    
                    window.scrollTo(0, scrollTo);
    
                    if (elapsedTime < duration) {
                    requestAnimationFrame(scrollAnimation);
                    }
                }
    
                function easeOutCubic(t) {
                    return (t - 1) * Math.pow(t, 2) + 1;
                }
    
                requestAnimationFrame(scrollAnimation);
            }
        }
        window.addEventListener("load", scrollToSection);
    }
});

function toggleMenu() {
    document.querySelector('.toggle').classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
}
