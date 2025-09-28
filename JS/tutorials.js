//* Nav tutorial button hover
const navTutBtn = document.getElementById('nav_tut_btn');
const navTut = document.getElementById('nav-tut');

// Variable to hold the timeout ID
let hideTimeout1;

if (navTutBtn && navTut) {
    // 1. Show the box when the mouse enters the button
    navTutBtn.addEventListener('mouseenter', () => {
        // Clear any pending hide action
        clearTimeout(hideTimeout1);
        navTut.classList.add('visible');
    });

    // 2. Hide preparation when the mouse leaves the button (DELAYED)
    navTutBtn.addEventListener('mouseleave', () => {
        // Start a short delay before hiding
        hideTimeout1 = setTimeout(() => {
            navTut.classList.remove('visible');
        }, 100); // 100ms delay to allow the cursor to move to the tutorial box
    });
    
    // 3. Keep the box visible if the mouse moves onto the tutorial box
    navTut.addEventListener('mouseenter', () => {
        // If the mouse enters the box, cancel the pending hide action
        clearTimeout(hideTimeout1);
    });

    // 4. Hide the box when the mouse leaves the tutorial box
    navTut.addEventListener('mouseleave', () => {
        // Hide the box immediately after leaving the box area
        navTut.classList.remove('visible');
    });

} else {
    console.error("Missing elements: Ensure both #classSettings_tut_btn and #classSettings_tut exist.");
}

//* Class Settings tutorial button hover
const classSettingsTutBtn = document.getElementById('classSettings_tut_btn');
const classSettingsTut = document.getElementById('classSettings_tut');

// Variable to hold the timeout ID
let hideTimeout;

if (classSettingsTutBtn && classSettingsTut) {
    // 1. Show the box when the mouse enters the button
    classSettingsTutBtn.addEventListener('mouseenter', () => {
        // Clear any pending hide action
        clearTimeout(hideTimeout);
        classSettingsTut.classList.add('visible');
    });

    // 2. Hide preparation when the mouse leaves the button (DELAYED)
    classSettingsTutBtn.addEventListener('mouseleave', () => {
        // Start a short delay before hiding
        hideTimeout = setTimeout(() => {
            classSettingsTut.classList.remove('visible');
        }, 100); // 100ms delay to allow the cursor to move to the tutorial box
    });
    
    // 3. Keep the box visible if the mouse moves onto the tutorial box
    classSettingsTut.addEventListener('mouseenter', () => {
        // If the mouse enters the box, cancel the pending hide action
        clearTimeout(hideTimeout);
    });

    // 4. Hide the box when the mouse leaves the tutorial box
    classSettingsTut.addEventListener('mouseleave', () => {
        // Hide the box immediately after leaving the box area
        classSettingsTut.classList.remove('visible');
    });

} else {
    console.error("Missing elements: Ensure both #classSettings_tut_btn and #classSettings_tut exist.");
}