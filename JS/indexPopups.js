//* UPLOAD FILES PO-PUP

//UI elements
const addButton = document.getElementById('addButton');
const popup = document.getElementById('filesPopup');
const closePopupBtn = document.getElementById('closePopup');
const LoginAddButton = document.getElementById('LoginButton');

// Open popup with fade-in
const openPopup = () => {
    //! here it closes the other popups
    closeClassMenuPopup();
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
const closePopup = () => {
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

//* ACCOUNT SETTINGS POP-UP

const accountButtonNav = document.getElementById("AccountButton");
const accountPopup = document.getElementById("AccountSettingsPopUp");
const closeAccountPopupBtn = document.getElementById("closeAccountPopup");

const openAccountPopup = () => {
    //! here it closes the other popups
    closePopup();
    closeClassMenuPopup();

    if (accountPopup) {
        //console.log("open");
        accountPopup.style.display = "block";
        accountPopup.classList.add('visible');
    }
};

const closeAccountPopup = () => {
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

//* CLASS SETTINGS POP-UP

const ClassMenuButton = document.getElementById("classMenuButton");
const classMenuPopup = document.getElementById("ClassSettingsPopUp");
const closeClassMenu = document.getElementById("closeClassSettingsPopup");

const openClassMenuPopup = () => {
    if (classMenuPopup) {
        //! here it closes the other popups
        closePopup();
        closeAccountPopup();

        classMenuPopup.style.display = "block";
        classMenuPopup.classList.add('visible');
    }
};

const closeClassMenuPopup = () => {
    if (classMenuPopup) {
        classMenuPopup.classList.remove('visible');
    }
}

if (ClassMenuButton) {
    ClassMenuButton.addEventListener('click', (event) => {
        openClassMenuPopup();
        event.stopPropagation();
    });
} else {
    console.error('AccountBTN not found!');
}

if (closeClassMenu) {
    closeClassMenu.addEventListener('click', (event) => {
        closeClassMenuPopup();
        event.stopPropagation();
    });
} else {
    console.error('closeClassMenuPopup not found!');
}

window.addEventListener('click', (event) => {
    if (classMenuPopup) {
        const isClickInsidePopup = classMenuPopup.contains(event.target);
        const isClickOnAccountBtn = ClassMenuButton && ClassMenuButton.contains(event.target);
        const isPopupVisible = classMenuPopup.classList.contains('visible');

        if (isPopupVisible && !isClickInsidePopup && !isClickOnAccountBtn) {
            closeClassMenuPopup();
        }
    }
});

