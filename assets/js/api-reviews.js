import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBeg4QPPuM9xghL1HwNiXEDbryyilpGmC8",
    authDomain: "api-20syl.firebaseapp.com",
    projectId: "api-20syl",
    storageBucket: "api-20syl.appspot.com",
    messagingSenderId: "18523544518",
    appId: "1:18523544518:web:3c18c082bef03cce92b0c7"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const reviews = doc(db, 'gemsync', navigator.language.startsWith('en') ? 'reviewsEN' : 'reviewsFR');

// Fonction pour récupérer les avis et les stocker
async function gemsync() {
    const docSnap = await getDoc(reviews);
    if (docSnap.exists()) {
        const reviewsTab = Array.from({ length: 6 }, (_, i) => ({
            review: docSnap.get(`review${i + 1}`),
            name: docSnap.get(`name${i + 1}`),
            job: docSnap.get(`job${i + 1}`)
        }));
        reviewCycle(reviewsTab);
    }
}

// Fonction pour mettre à jour les avis affichés de manière décalée
function reviewCycle(reviewsTab) {
    let currentIndex = 0;
    const reviewElements = document.querySelectorAll('.reviewsContent');

    function updateReviews() {
        reviewElements.forEach((element, i) => {
            const { review, name, job } = reviewsTab[(currentIndex + i) % reviewsTab.length];
            element.querySelector('p').textContent = `"${review}"`;
            element.querySelector('h3').innerHTML = `${name}<br><span>${job}</span>`;
        });
        currentIndex = (currentIndex + 2) % reviewsTab.length;
        setTimeout(updateReviews, 10000);
    }
    updateReviews();
}
gemsync();