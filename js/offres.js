document.addEventListener("DOMContentLoaded", function() {
    // Redirection vers la page de la langue de l'utilisateur
    var manual = document.cookie.split('; ').find(row => row.startsWith('user_language_preference='))?.split('=')[1];

    if (!manual) {
        var FullUserLang = navigator.language || navigator.userLanguage;
        var userLang = FullUserLang.slice(0, 2);

        if (userLang === "en") {
            if (window.location.href !== "https://en.gemsync.xyz/offers") {
                //window.location.replace("https://en.gemsync.xyz/offers");
            }
        } else {
            if (window.location.href !== "https://gemsync.xyz/offres") {
                //window.location.replace("https://gemsync.xyz/offres");
            }
        }
    }
});

// Vérifier si l'URL contient un ID de section
const sectionID = window.location.hash.substring(1);
if (sectionID) {
    // Animer le défilement vers la section avec l'ID spécifié
    function scrollToSection() {
        const section = document.getElementById(sectionID);
        if (section) {
            const sectionOffset = section.getBoundingClientRect().top;
            const currentScroll = window.scrollY;
            const duration = 1000;
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

window.addEventListener('scroll', function(){
    var header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

function toggleMenu(){
    var  menuToggle = document.querySelector('.toggle');
    var  menu = document.querySelector('.menu');
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
}
