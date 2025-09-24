import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import { displayName } from './index.js'


//Displays the name of the user to the account <p></p>
export function displayUserName() {
    //console.log('display name riuscito!!')
    accountButtonNav.textContent = displayName;
}

const accountButtonNav = document.getElementById("AccountBTN");


// TODO Attach event listeners

// Logout
export function logoutUser() {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("User signed out successfully.");
    // Redirect or update UI to reflect the logged-out state
    window.location.href = './LogScreen/LogScreen.html'; // Or to a login page
  }).catch((error) => {
    // An error happened.
    console.error("Error signing out:", error);
  });
}