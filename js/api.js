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
}

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docRef = doc(db, 'infos', 'gemsync');

// Fonction pour récupérer les données
async function gemsync() {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        const reductions = [data.reduction1, data.reduction2, data.reduction3, data.reduction4];
        const prices = [data.standard, data.plus, data.premium, data.pro].map((price, index) => 
            (price * (1 - reductions[index] / 100)).toFixed(2)
        );

        prices.forEach((price, index) => {
            const priceElement = document.getElementById(`price${index + 1}`);
            const remiseElement = document.getElementById(`remise${index + 1}`);
            priceElement.innerHTML = `${data[`type${index + 1}`]}€`;

            if (reductions[index] !== '0') {
                priceElement.innerHTML = `${price}€`;
                remiseElement.style.display = 'inline-block';
                remiseElement.textContent = `-${reductions[index]}%`;
            }

            document.getElementById(`paypal${index + 1}`).href = `https://paypal.me/GemSync/${price}EUR`;
        });
    }
}
gemsync()