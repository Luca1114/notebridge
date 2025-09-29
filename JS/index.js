import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
// 🔑 UPDATED IMPORTS: Added updateDoc and deleteField
import { doc, getDoc, updateDoc, deleteField, arrayRemove } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js"; 

import { displayUserName } from './accountPopup.js';
import { updateAccountName } from '/JS/accountPopup.js';

export var displayName = "";
// 🔑 NEW EXPORT: Make currentClassId globally accessible
export var currentClassId = ""; 

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
    
    // 🔑 ASSIGNMENT: Assign the ID to the exported variable
    currentClassId = userData.currentClassId; 

    // Check if the user is in a classroom
    if (!currentClassId) {
        console.log("User has no current class. Redirecting to class selection screen.");
        window.location.href = './LogScreen/LogScreenClass.html';
        return;
    }

    // 1. Update User Display Name
    displayName = userData.displayName;
    // Removed redundant displayClassName() call here
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

//? Displays the name of the class in both the nav and the class settings pop-up
const classNameElement = document.getElementById('classNameDisplay');
/**
 * Updates the text content of the class display element in the nav.
 * @param {string} name - The name of the current class.
 */
function displayClassName(name) {
    const classNameInput = document.getElementById("nameChangeInputClass");
    if (classNameElement) {
        classNameElement.textContent = name;
    }
    if (classNameInput) {
        classNameInput.value = name;
    } else {
        console.error("Element with ID 'classNameDisplay' not found.");
    }
}

//? Lets you change the name of the class from the class settings pop-up

const classNameSave = document.getElementById('changeClassName');

// 🔑 NEW FUNCTION: Update the class name in Firestore
async function updateClassName() {
    const nameChangeInput = document.getElementById("nameChangeInputClass");

    if (!nameChangeInput || !nameChangeInput.value) {
        console.error("Class name input field not found or is empty.");
        // Optional: Provide visual feedback to the user here
        return;
    }

    if (!currentClassId) {
        console.error("Cannot change class name: currentClassId is missing.");
        return;
    }

    const newClassName = nameChangeInput.value.trim();
    const classDocRef = doc(db, "classes", currentClassId);

    try {
        await updateDoc(classDocRef, {
            name: newClassName
        });
        console.log("Class name updated successfully to:", newClassName);
        // Reload the page to refresh the display in the nav and input field
        location.reload(); 
    } catch (error) {
        console.error("Error updating class name:", error);
    }
}


if (classNameSave) {
      classNameSave.addEventListener('click', updateClassName);
}

//? Leave the class when clicking on the "leave class" button

/**
 * Clears the currentClassId from the user document AND removes the user
 * from the class's members array, then reloads the page.
 */
export async function leaveClassAndReload() {
    const user = auth.currentUser;

    if (!user) {
        console.error("No user logged in to leave class.");
        location.reload(); 
        return;
    }

    if (!currentClassId) {
        console.log("User is already not in a class.");
        location.reload(); 
        return;
    }

    const uid = user.uid;
    console.log(`User ${uid} is leaving class ${currentClassId}.`);
    
    const userDocRef = doc(db, "users", uid);
    const classDocRef = doc(db, "classes", currentClassId); // Reference to the class document

    try {
        // 1. Remove user from the CLASS's members list
        await updateDoc(classDocRef, {
            members: arrayRemove(uid) // This removes the user's UID from the 'members' array
        });
        console.log(`Successfully removed user ${uid} from class ${currentClassId} members.`);


        // 2. Clear the currentClassId field from the USER's document
        await updateDoc(userDocRef, {
            currentClassId: deleteField() 
        });
        console.log(`Successfully cleared currentClassId for user ${uid}.`);
        
        // 3. Reload the page
        location.reload(); 
    } catch (error) {
        console.error("Error leaving class:", error);
        alert("Failed to leave the class. Please check your connection and try again.");
    }
}