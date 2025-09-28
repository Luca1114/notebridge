// chipsArrange.js
import { closeAccountPopup } from "./accountPopup.js"; // Import the function

const addButton = document.getElementById('addButton');
const popup = document.getElementById('filesPopup');
const closePopupBtn = document.getElementById('closePopup');
const container = document.getElementById('containernoteschips');
const nothingmessage = document.getElementById('nonotesmessage');
const LoginAddButton = document.getElementById('LoginButton');

let divCount = 0;

// Check if there are any chips and toggle "no notes" message
function chipCheck() {
    if (nothingmessage) {
        if (divCount === 0) {
            nothingmessage.style.display = 'block';
            nothingmessage.textContent = 'No notes have been uploaded yet!';
        } else {
            nothingmessage.style.display = 'none';
            nothingmessage.textContent = '';
        }
    } else {
        console.error('nonotesmessage element not found');
    }
}

// Run chipCheck on load
window.onload = chipCheck;

//* POPUP

// Open popup with fade-in
const openPopup = () => {
    // Call the function to close the other popup first
    closeAccountPopup();

    if (popup) {
        //console.log('Opening popup, initial state:', popup.style.opacity, popup.style.visibility);
        popup.style.visibility = 'visible'; // Make element visible
        popup.style.opacity = '0'; // Ensure starting point
        // Force reflow to apply initial state
        popup.offsetHeight;
        popup.style.opacity = '1'; // Trigger fade-in
        popup.classList.add('visible');
        event.stopPropagation();
    } else {
        console.error('popup element not found');
    }
};

// Close popup with fade-out
export const closePopup = () => {
    if (popup) {
        // popup, initial state:', popup.style.opacity, popup.style.visibility);
        popup.style.opacity = '0'; // Start fade-out
        setTimeout(() => {
            popup.style.visibility = 'hidden'; // Hide after transition
            popup.style.opacity = ''; // Reset opacity
            popup.classList.remove('visible');
            console.log('Popup closed, final state:', popup.style.opacity, popup.style.visibility);
        }, 300); // Match CSS transition duration (0.3s)
    }
};

// Detect clicks outside the popup
document.addEventListener('click', function(event) {
    if (popup && popup.classList.contains('visible') && !popup.contains(event.target)) {
        //console.log('Clicked outside the visible popup, target:', event.target);
        closePopup();
    }
});

//* CHIPS

// Array of color schemes for chips
const colorSchemes = [
    { gradient: 'linear-gradient(to bottom, #349E7F, #7BB4A3)', borderColor: '#9CE4CF', innerBackground: '#32715F' },
    { gradient: 'linear-gradient(to bottom, #C847EE, #B98CC6)', borderColor: '#F2C4F8', innerBackground: '#8012A0' },
    { gradient: 'linear-gradient(to bottom, #2F74EE, #8DB0EE)', borderColor: '#9CAFE4', innerBackground: '#325CA6' }
];

// Function to add a new chip
const addNewDiv = () => {
    divCount++;
    chipCheck();

    const outerDiv = document.createElement('div');
    const newDiv = document.createElement('div');
    newDiv.classList.add('template-div');

    const colorIndex = (divCount - 1) % colorSchemes.length;
    newDiv.style.background = colorSchemes[colorIndex].gradient;
    newDiv.style.border = `3px solid ${colorSchemes[colorIndex].borderColor}`;

    const contentDiv = document.createElement('div');
    contentDiv.style.backgroundColor = colorSchemes[colorIndex].innerBackground;
    contentDiv.style.height = '100%';
    contentDiv.style.display = 'flex';
    contentDiv.style.flexDirection = 'column';
    contentDiv.style.justifyContent = 'space-between';

    const image = document.createElement('img');
    image.src = './OTHERASSETS/doc_ex1.png';
    newDiv.appendChild(image);

    const title = document.createElement('h3');
    title.textContent = `Notes #${divCount}`;
    contentDiv.appendChild(title);

    const editable = document.createElement('div');
    contentDiv.appendChild(editable);

    const icon = document.createElement('img');
    icon.src = './ICONS/typeIcons/doc_icon.png';
    icon.classList.add('icon');
    contentDiv.appendChild(icon);

    newDiv.appendChild(contentDiv);
    outerDiv.appendChild(newDiv);
    container.appendChild(outerDiv);
};

// Attach event listeners
if (addButton) {
    addButton.addEventListener('click', (event) => {
        openPopup();        // Call the second function
    });
} else {
    console.error('addButton not found');
}

if (closePopupBtn || LoginAddButton) {
    closePopupBtn.addEventListener('click', closePopup);
    LoginAddButton.addEventListener('click', closePopup);
}

