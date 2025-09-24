import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

import { displayUserName } from './userPopup.js';
import { updateAccountName } from './accountPopup.js'; // Import the new function

export var displayName = "";

window.onload = onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("User is logged in with UID:", user.uid);
    await getUserData(user.uid);
  } else {
    console.log("No user is logged in.");
    window.location.href = './LogScreen/LogScreen.html'
  }
});

async function getUserData(uid) {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    console.log("User data:", userDocSnap.data());
    displayName = userDocSnap.data().displayName;
    displayUserName(); // This is the old function call
    updateAccountName(displayName); // This is the new function call
  } else {
    console.log("No such user document!");
  }
}