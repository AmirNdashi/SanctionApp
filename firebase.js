// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC3O379Lgztskxy3oDER3KkU9VE5ad1sL8",
//   authDomain: "sanctionapp.firebaseapp.com",
//   projectId: "sanctionapp",
//   storageBucket: "sanctionapp.firebasestorage.app",
//   messagingSenderId: "557223926424",
//   appId: "1:557223926424:web:760515b50c497200fc0eed",
//   measurementId: "G-5CY9QFG0QP"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { db };


// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC3O379Lgztskxy3oDER3KkU9VE5ad1sL8",
    authDomain: "sanctionapp.firebaseapp.com",
    projectId: "sanctionapp",
    storageBucket: "sanctionapp.firebasestorage.app",
    messagingSenderId: "557223926424",
    appId: "1:557223926424:web:760515b50c497200fc0eed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
