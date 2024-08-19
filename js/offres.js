document.addEventListener('DOMContentLoaded', function() {
    // Redirection vers la page de la langue de l'utilisateur
    const manual = document.cookie.split('; ').find(row => row.startsWith('user_language_preference='))?.split('=')[1];
    const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);

    if (!manual) {
        const currentUrl = window.location.href;

        if (userLang === 'en' && currentUrl !== 'https://en.gemsync.xyz/offers') {
            window.location.replace('https://en.gemsync.xyz/offers');
        } else if (userLang !== 'en' && currentUrl !== 'https://gemsync.xyz/offres') {
            window.location.replace('https://gemsync.xyz/offres');
        }
    }

    // Gérer l'en-tête sticky
    window.addEventListener('scroll', function() {
        document.querySelector('header').classList.toggle('sticky', window.scrollY > 0);
    });

    // Afficher les conditions de nom de domaine
    document.querySelectorAll('.domain').forEach(box => {
        const info = document.createElement('p');
        info.className = 'domain-info';
        const message = userLang === 'en'
            ? 'Depending on availability and pack price.'
            : 'Selon disponibilité et dans la limite du prix du pack.';
        info.textContent = message;
        box.appendChild(info);

        box.addEventListener('mouseover', function() {
            this.style.position = 'relative';
            const info = this.querySelector('.domain-info');
            info.classList.add('show');
        });

        box.addEventListener('mouseout', function() {
            const info = this.querySelector('.domain-info');
            info.classList.remove('show');
        });
    });
});

function toggleMenu() {
    document.querySelector('.toggle').classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
}
