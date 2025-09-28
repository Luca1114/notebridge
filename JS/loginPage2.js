import { auth, db } from './firebase.js'; // Adjust path if needed
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

import { emailCheck1 } from "./loginPage.js";
import { passCheck1 } from "./loginPage.js";
import { nickCheck2 } from "./loginPage.js";
import { emailCheck2 } from "./loginPage.js";
import { passCheck2 } from "./loginPage.js";

//Sign up Errors
import { displayErrors1 } from "./loginPage.js"
import { displayErrors2 } from "./loginPage.js"
import { displayErrors3 } from "./loginPage.js"
import { displayErrors4 } from "./loginPage.js"
//Login Errors
import { displayErrors5 } from "./loginPage.js"
import { displayErrors6 } from "./loginPage.js"
import { displayErrors7 } from "./loginPage.js"
import { displayErrors8 } from "./loginPage.js"

//* SIGN UP
// Add this inside a button click event (we’ll create the button later)
export function createUser() { //This function is visible to other files
  console.log("creating account...")

  const email = emailCheck2.value; 
  const password = passCheck2.value; 

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log('Account created:', user.uid);
      // We’ll save extra info next

      //* TO BE CHANGED
      // Save extra account info
      const accountData = {
        uid: user.uid,
        email: user.email,
        displayName: nickCheck2.value,
        firstTime: true
      };

      try {
        await setDoc(doc(db, 'users', user.uid), accountData);
        console.log('Account info saved');
        window.location.href = './LogScreenClass.html'
      } catch (e) {
        console.error('Error saving account:', e);
      }
    })

  .catch((error) => {
    const errorCode = error.code;

    switch (errorCode) {
      case 'auth/weak-password':
        displayErrors1()
        //alert("Password is too weak. Please use a stronger one.");
        break;
      case 'auth/email-already-in-use':
        displayErrors2()
        //alert("This email is already in use. Try logging in or use a different email.");
        break;
      case 'auth/invalid-email':
        displayErrors3()
        //alert("The email address is not valid.");
        break;
      default:
        displayErrors4()
        //alert("Ops, something went wrong!");
        console.error('Unhandled error:', error);
    }
  });
};

//* LOGIN

export function signinUser(){
  const email = emailCheck1.value; 
  const password = passCheck1.value;   

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Signed in:', user.uid);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          //alert('User logged in:', user.uid);
          //TODO Here it will need to check if it's your first time and provide you with a tutorial
          window.location.href = '../index.html';
        } else {
          console.log('No user logged in');
        }
      });
    })
    .catch((error) => {
    const errorCode = error.code;

      switch (errorCode) {
        case 'auth/invalid-email':
          displayErrors5()
          //alert("The email address is not valid.");
          break;
        case 'auth/user-not-found':
          displayErrors6()
        case 'auth/wrong-password':
          displayErrors7()
        case 'auth/invalid-credential':
          displayErrors7()
        default:
          displayErrors8()
          //alert("Ops, something went wrong!");
          console.error('Unhandled error:', error);
      }
    });
}
