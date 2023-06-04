import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSUGnt94Zo9mqRkfO-BqgEB7PeStcLNb8",
    authDomain: "crwn-clothing-db-203df.firebaseapp.com",
    projectId: "crwn-clothing-db-203df",
    storageBucket: "crwn-clothing-db-203df.appspot.com",
    messagingSenderId: "889822067491",
    appId: "1:889822067491:web:70801a437546f56a8e6a96"
};

// Initialize Firebase
const firbaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            })

        } catch (error) {
            console.log("Not able to store the user: ",error.message);
        }
    }

    return userDocRef;
}