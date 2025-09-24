//! accountActions.js

import { auth, db } from './firebase.js';
import { updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { updateProfile, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import { closePopup } from "./chipsArrange.js"

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


//! accountPopup.js

const accountButtonNav = document.getElementById("AccountButton");
const accountPopup = document.getElementById("AccountSettingsPopUp");
const closeAccountPopupBtn = document.getElementById("closeAccountPopup");

const openAccountPopup = () => {
    closePopup();

    if (accountPopup) {
        //console.log("open");
        accountPopup.style.display = "block";
        accountPopup.classList.add('visible');
    }
};

export const closeAccountPopup = () => {
    if (accountPopup) {
        accountPopup.classList.remove('visible');
    }
}

if (accountButtonNav) {
    accountButtonNav.addEventListener('click', (event) => {
        openAccountPopup();
        event.stopPropagation();
    });
} else {
    console.error('AccountBTN not found!');
}

if (closeAccountPopupBtn) {
    closeAccountPopupBtn.addEventListener('click', (event) => {
        closeAccountPopup();
        event.stopPropagation();
    });
} else {
    console.error('closeAccountPopup not found!');
}

window.addEventListener('click', (event) => {
    if (accountPopup) {
        const isClickInsidePopup = accountPopup.contains(event.target);
        const isClickOnAccountBtn = accountButtonNav && accountButtonNav.contains(event.target);
        const isPopupVisible = accountPopup.classList.contains('visible');

        if (isPopupVisible && !isClickInsidePopup && !isClickOnAccountBtn) {
            closeAccountPopup();
        }
    }
});