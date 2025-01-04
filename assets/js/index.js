// Récupérer la langue du navigateur et l'URL
const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);
const isEnglish = userLang === 'en';
const url = isEnglish ? 'https://en.gemsync.xyz/' : 'https://gemsync.xyz/';

document.addEventListener('DOMContentLoaded', () => {
    // Redirection et gestion de l'en-tête sticky
    if (!document.cookie.includes('user_language_preference=') && window.location.href !== url) {
        window.location.replace(url);
    }
    document.querySelector('header').classList.toggle('sticky', window.scrollY > 0);
});

// Gérer l'en-tête sticky
window.addEventListener('scroll', function() {
    document.querySelector('header').classList.toggle('sticky', window.scrollY > 0);
});

// Onglet de contact par mail
function mail(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = document.getElementById('submitButton');
    
    const status = response => {
        submitButton.value = response.ok ? (isEnglish ? 'Sent !' : 'Envoyé !') : (isEnglish ? 'Send' : 'Envoyer');
        submitButton.style.backgroundColor = response.ok ? '#4caf50' : '#46449e';
        form.reset();
        setTimeout(() => {
            submitButton.value = isEnglish ? 'Send' : 'Envoyer';
            submitButton.style.backgroundColor = '#46449e';
        }, 3000);
    };

    submitButton.value = isEnglish ? 'Sending...' : 'Envoi...';
    submitButton.style.backgroundColor = '#e3a739';

    fetch(form.action, { method: form.method, body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(status);
}

// Fonction pour la version mobile
function toggleMenu() {
    document.querySelector('.toggle').classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
}
