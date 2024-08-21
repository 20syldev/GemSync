// Récupérer la langue du navigateur
const userLang = (navigator.language || navigator.userLanguage).slice(0, 2);

document.addEventListener('DOMContentLoaded', function() {
    // Redirection vers la page de la langue de l'utilisateur
    const manual = document.cookie.split('; ').find(row => row.startsWith('user_language_preference='))?.split('=')[1];

    if (!manual) {
        const currentUrl = window.location.href;

        if (userLang === 'en' && currentUrl !== 'https://en.gemsync.xyz/') {
            window.location.replace('https://en.gemsync.xyz/');
        } else if (userLang !== 'en' && currentUrl !== 'https://gemsync.xyz/') {
            window.location.replace('https://gemsync.xyz/');
        }
    }

    // Vérifier si l'en-tête est scrollée ou non, si oui, activer le sticky
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
    const formData = new FormData(form);
    const submitButton = document.getElementById('submitButton');
    
    if (userLang === 'en') {
        submitButton.value = 'Sending...';
    } else if (userLang !== 'en') {
        submitButton.value = 'Envoi...';
    }
    submitButton.style.backgroundColor = '#e3a739';

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            if (userLang === 'en') {
                submitButton.value = 'Sent !';
            } else if (userLang !== 'en') {
                submitButton.value = 'Envoyé !';
            }
            submitButton.value = 'Envoyé !';
            submitButton.style.backgroundColor = '#4caf50';
            form.reset();
            setTimeout(() => {
                if (userLang === 'en') {
                    submitButton.value = 'Send';
                } else if (userLang !== 'en') {
                    submitButton.value = 'Envoyer';
                }
                submitButton.style.backgroundColor = '#46449e';
            }, 3000);
        } else {
            if (userLang === 'en') {
                submitButton.value = 'Send';
            } else if (userLang !== 'en') {
                submitButton.value = 'Envoyer';
            }
            submitButton.style.backgroundColor = '#46449e';
        }
    });
}

// Fonction pour la version mobile
function toggleMenu() {
    document.querySelector('.toggle').classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
}
