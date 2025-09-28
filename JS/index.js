import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
// 🔑 UPDATED IMPORTS: Added updateDoc and deleteField
import { doc, getDoc, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

import { displayUserName } from './userPopup.js';
import { updateAccountName } from '/JS/accountPopup.js';

export var displayName = "";

/**
 * Updates the text content of the class display element in the nav.
 * @param {string} name - The name of the current class.
 */
function displayClassName(name) {
    const classNameElement = document.getElementById('classNameDisplay');
    if (classNameElement) {
        classNameElement.textContent = name;
    } else {
        console.error("Element with ID 'classNameDisplay' not found.");
    }
}

window.onload = onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User is logged in with UID:", user.uid);
    await getUserData(user.uid);
  } else {
    console.log("No user is logged in. Redirecting to login screen.");
    window.location.href = './LogScreen/LogScreen.html'
  }
});

async function getUserData(uid) {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const userData = userDocSnap.data();
    console.log("User data:", userData);
    
    const currentClassId = userData.currentClassId;

    // Check if the user is in a classroom
    if (!currentClassId) {
        console.log("User has no current class. Redirecting to class selection screen.");
        window.location.href = './LogScreen/LogScreenClass.html';
        return;
    }

    // 1. Update User Display Name
    displayName = userData.displayName;
    displayUserName();
    updateAccountName(displayName);

    // 2. Fetch and Display Class Name
    const classDocRef = doc(db, "classes", currentClassId);
    const classDocSnap = await getDoc(classDocRef);

    if (classDocSnap.exists()) {
        const className = classDocSnap.data().name;
        console.log("Current Class Name:", className);
        displayClassName(className);
    } else {
        // 🔑 NEW LOGIC: Invalid class ID found. Clear it and redirect.
        console.warn(`Class document not found for ID: ${currentClassId}. Clearing invalid ID from user profile.`);
        displayClassName("Class Not Found (Error)");
        
        // Remove the currentClassId field from the user document
        try {
            await updateDoc(userDocRef, {
                currentClassId: deleteField() // This explicitly removes the field
            });
            console.log(`Successfully cleared invalid currentClassId for user ${uid}.`);
        } catch (error) {
            console.error("Error clearing invalid class ID:", error);
        }

        // Redirect the user to the class creation/join screen
        window.location.href = './LogScreen/LogScreenClass.html';
        return;
    }

  } else {
    console.log("No such user document!");
    displayClassName("No User Data");
  }
}