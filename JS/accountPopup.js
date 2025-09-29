//! accountActions.js

import { auth, db } from './firebase.js';
import { updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { updateProfile, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import { displayName } from './index.js'

//? Displays the nameof the user in the top right of the Index
const accountButtonNav = document.getElementById("AccountBTN");

//Displays the name of the user to the account <p></p>
export function displayUserName() {
    //console.log('display name riuscito!!')
    accountButtonNav.textContent = displayName;
}


/**
 * Updates the value of the name input field in the account settings popup.
 * This function is called from index.js after fetching the user's display name.
 * It's structured to find the element when it's called, ensuring the element exists.
 * @param {string} name - The user's current display name.
 */
export function updateAccountName(name) {
    const nameChangeInput = document.getElementById("nameChangeInput");
    if (nameChangeInput) {
        nameChangeInput.value = name;
    }
}

// All event listeners for account actions are placed inside this block
document.addEventListener('DOMContentLoaded', () => {
    const nameChangeInput = document.getElementById("nameChangeInput");
    const changeAccountNameBtn = document.getElementById("changeAccountName");

    /**
     * Handles the display name update process.
     */
    async function updateDisplayName() {
        if (!navigator.onLine) {
            console.error("No internet connection. Please check your network and try again.");
            return;
        }

        const newDisplayName = nameChangeInput.value;
        const user = auth.currentUser;

        if (user && newDisplayName) {
            try {
                await updateProfile(user, {
                    displayName: newDisplayName
                });
                const userDocRef = doc(db, "users", user.uid);
                await updateDoc(userDocRef, {
                    displayName: newDisplayName
                });
                console.log("Display name updated successfully!");
                location.reload();
            } catch (error) {
                console.error("Error updating display name:", error);
            }
        } else {
            console.error("Please enter a valid name.");
        }
    }

    if (changeAccountNameBtn) {
        changeAccountNameBtn.addEventListener('click', updateDisplayName);
    } else {
        console.error('Save button not found!');
    }
});

//* Log out
export function logoutUser() {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("User signed out successfully.");
    // Redirect or update UI to reflect the logged-out state
    //window.location.href = './LogScreen/LogScreen.html';
    location.reload();
  }).catch((error) => {
    // An error happened.
    console.error("Error signing out:", error);
  });
}

const logoutBtn = document.getElementById('SignOutButton');

if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
}