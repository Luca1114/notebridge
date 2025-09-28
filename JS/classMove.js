// classMove.js
import { auth, db } from './firebase.js'; 
import { collection, addDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { query, where, getDocs, arrayUnion } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getDoc, deleteField } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// UI Elements
const joinClassButton = document.getElementById('JoinClassButton');
const classCodeInput = document.getElementById('classCodeInput');

const logoutBTNLogScreen = document.getElementById("switchLogScreen");

/**
 * Generates a 5-character alphanumeric code.
 * This code is suitable for a class code that should be easy to type.
 * Ensures the code contains at least one digit, as requested.
 * @returns {string} The 5-character class code.
 */
function generateClassCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    let hasNumber = false;

    for (let i = 0; i < 5; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        code += char;
        if (!isNaN(parseInt(char))) {
            hasNumber = true;
        }
    }

    // Ensure it has at least one number if it doesn't already (simple check)
    if (!hasNumber) {
        // Replace a random character with a number (0-9)
        const randomIndex = Math.floor(Math.random() * 5);
        code = code.substring(0, randomIndex) + Math.floor(Math.random() * 10) + code.substring(randomIndex + 1);
    }
    
    return code;
}

//* Log into a class

/**
 * Handles the logic for a user joining an existing class using a code.
 * @param {object} user - The Firebase authenticated user object.
 * @param {string} classCode - The 5-character class code entered by the user.
 */
async function joinClass(user, classCode) {
    const code = classCode.toUpperCase().trim();

    try {
        // 1. Query the 'classes' collection for the matching code
        const classesRef = collection(db, 'classes');
        const q = query(classesRef, where("code", "==", code));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            // 🔑 Using alert() for error display
            alert("No class found with that code. Please check the code and try again.");
            return;
        }

        // Get the class document and ID
        const classDoc = querySnapshot.docs[0];
        const classId = classDoc.id;
        const classDocRef = doc(db, 'classes', classId);

        // 2. Add the user's UID to the class's members array
        await updateDoc(classDocRef, {
            members: arrayUnion(user.uid) // Safely adds the UID without creating duplicates
        });
        console.log(`User ${user.uid} added to class ${classId}`);

        // 3. Update the user's currentClassId
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
            currentClassId: classId
        });
        console.log(`User ${user.uid} is now logged into class ${classId}`);

        // 4. Redirect the user to the main application page
        window.location.href = '../index.html';

    } catch (e) {
        console.error('Error joining class or updating user:', e);
        // 🔑 Using alert() for error display
        alert("An unexpected error occurred while trying to join the class. Please try again.");
    }
}

// Attach event listeners after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // * JOIN CLASS BUTTON LISTENER --------
    if (joinClassButton) {
        joinClassButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const user = auth.currentUser;
            
            if (!user) {
                alert("You must be logged in to join a class.");
                return;
            }

            const classCode = classCodeInput ? classCodeInput.value.trim() : "";

            if (classCode.length !== 5) {
                alert("The class code must be 5 characters long.");
                return;
            }

            await joinClass(user, classCode);
        });
    }
});

//* CREATE a class

document.getElementById('CreateClassPageButton').addEventListener('click', async () => {
    const classNameInput = document.getElementById('classNameInput');
    const className = classNameInput ? classNameInput.value.trim() : '';

    if (!className) {
        alert("Please enter a name for your new class.");
        return;
    }

    const user = auth.currentUser;

    if (!user) {
        // Should not happen if the user is already at this screen, but good practice
        alert("You must be logged in to create a class.");
        return;
    }

    // 1. Generate the class code
    const classCode = generateClassCode();
    console.log(`Generated Class Code: ${classCode}`);

    try {
        // 2. Save the new class to a 'classes' collection in Firestore
        const newClassData = {
            name: className,
            code: classCode, // The code other users will use to join
            ownerId: user.uid,
            members: [user.uid], // The creator is the first member
            createdAt: new Date()
        };

        const classRef = await addDoc(collection(db, 'classes'), newClassData);
        const newClassId = classRef.id;
        console.log('Class saved with ID:', newClassId);

        // 3. Automatically log the user into the newly created class
        // Update the user's document in a 'users' collection with the new class ID
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
            currentClassId: newClassId
        });
        console.log(`User ${user.uid} is now logged into class ${newClassId}`);


        // 4. Redirect the user to the main application page
        window.location.href = '../index.html'; // Adjust the path if needed

    } catch (e) {
        console.error('Error creating class or updating user:', e);
        alert("An error occurred while creating the class. Please try again.");
    }
});




// classMove.js (Starting from the last DOMContentLoaded block)

// ... (Your existing code for generateClassCode, joinClass, and button listeners) ...

// ⭐ CORRECTED LOGIC: Use onAuthStateChanged to get the user object
document.addEventListener("DOMContentLoaded", () => {
    // onAuthStateChanged listens for when the user is authenticated (or not)
    // and provides the 'user' object when it's ready.
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // ⭐ 1. Now it is safe to define 'uid' from the 'user' object
            const uid = user.uid; 
            console.log("User is logged in with UID:", uid);

            // 2. Fetch user data using the defined 'uid'
            const userDocRef1 = doc(db, "users", uid);
            const userDocSnap1 = await getDoc(userDocRef1);

            if (userDocSnap1.exists()) {
                const userData1 = userDocSnap1.data();
                console.log("User data:", userData1);

                // 3. Update User Display Name
                // You were alerting the displayName, this is where you can access it:
                console.log(userData1.displayName);
                document.getElementById("usernameDisplayer").textContent = userData1.displayName;
                
            } else {
                console.log("No such user document!");
                // You may need a displayClassName function in this file if it's used here
                // displayClassName("No User Data"); 
            }
        }
    });
});


// * Logout with the button switch accounts
if (logoutBTNLogScreen) {
    logoutBTNLogScreen.addEventListener('click', (event) => {
        logoutUser1();
        event.stopPropagation();
    });
} else {
    console.error('closeAccountPopup not found!');
}

function logoutUser1() {
    signOut(auth).then(() => {
    // Sign-out successful.
    console.log("User signed out successfully.");
    // Redirect or update UI to reflect the logged-out state
    //window.location.href = './LogScreen/LogScreen.html';
    window.location.href = './LogScreen.html';
  }).catch((error) => {
    // An error happened.
    console.error("Error signing out:", error);
  });
}