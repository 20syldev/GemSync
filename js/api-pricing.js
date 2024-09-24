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
const pricing = doc(db, 'gemsync', 'pricing');

// Fonction pour récupérer les données
async function gemsync() {
    const docSnap = await getDoc(pricing);
    if (docSnap.exists()) {
        const data = docSnap.data();
        const reductions = [data.reduction1, data.reduction2, data.reduction3, data.reduction4];
        const prices = [data.standard, data.plus, data.premium, data.pro];

        prices.forEach((price, index) => {
            const priceElement = document.getElementById(`price${index + 1}`);
            const remiseElement = document.getElementById(`remise${index + 1}`);
            
            if (reductions[index] && reductions[index] !== '0') {
                const reducedPrice = (price * (1 - reductions[index] / 100)).toFixed(2);
                priceElement.innerHTML = `${reducedPrice}€`;
                remiseElement.style.display = 'inline-block';
                remiseElement.textContent = `-${reductions[index]}%`;
                
                tippy(priceElement, {
                    content: `<span style="padding: 10px;">Au lieu de <strong>${price}€</strong></span>`,
                    placement: 'right',
                    allowHTML: true,
                    duration: '1000',
                });
            } else {
                priceElement.innerHTML = `${price}€`;
                remiseElement.style.display = 'none';
            }
            
            document.getElementById(`paypal${index + 1}`).href = `https://paypal.me/GemSync/${price}EUR`;
        });
    }
}
gemsync();
