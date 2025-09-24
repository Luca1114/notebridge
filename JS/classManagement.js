import { db } from './firebase.js'; // Path to firebase.js in the same folder
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

document.getElementById('saveClassButton').addEventListener('click', async () => {
  alert("adnwind");
  const classData = {
    name: 'Math 101',
    teacher: 'John Doe'
  };

  try {
    const docRef = await addDoc(collection(db, 'classes'), classData);
    console.log('Class saved with ID:', docRef.id);
  } catch (e) {
    console.error('Error saving class:', e);
  }
});