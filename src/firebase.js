// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC8UUvqh3OsUbqQLIs18etdonvgrmRy2yA",
  authDomain: "netflix-clone-48104.firebaseapp.com",
  projectId: "netflix-clone-48104",
  storageBucket: "netflix-clone-48104.firebasestorage.app",
  messagingSenderId: "589713533266",
  appId: "1:589713533266:web:ed2c21f2d420e0df48f28b",
  measurementId: "G-3KTDVHK1D2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        console.log("User data added to Firestore");
    }catch(error){
        console.log(error);
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful");
    }catch(error){
        console.log(error);
        console.error("Error Code:", error.code);
        console.error("Error Message:", error.message);

        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = ()=>{
    signOut(auth);
    console.log("Logged out");
}
export {auth, db, signup, login, logout};