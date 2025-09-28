// chipsArrange.js
const container = document.getElementById('containernoteschips');
const nothingmessage = document.getElementById('nonotesmessage');

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

