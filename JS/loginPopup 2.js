import { createUser } from "./email-password.js";
import { signinUser } from "./email-password.js";

const LoginPopup = document.getElementById('LoginPopup');
//Switch
const switchSignUp = document.getElementById('signUpBTN');
const switchLogin = document.getElementById('logInBTN');
const SignupForm = document.getElementById('SignupForm');
const LoginForm = document.getElementById('LoginForm');
//Value Checks
const loginFinal4Check = document.getElementById('LogInFinal');
const signupFinal4Check = document.getElementById('SignUpFinal');
export const nickCheck2 = document.getElementById('nick2');
export const emailCheck1 = document.getElementById('email1');
export const emailCheck2 = document.getElementById('email2');
export const passCheck1 = document.getElementById('pass1');
export const passCheck2 = document.getElementById('pass2');
export const LoginCheckAlert1 = document.getElementById('alert1');
export const LoginCheckAlert2 = document.getElementById('alert2');

window.onload = function displayLoginDefault() {
    if (LoginForm) {
        LoginForm.style.display ="block";
    }
};

//* Switch
// Open popup by adding the 'visible' class
const SwitchSignUp = (event) => {
    //console.log("dnawindaw");
    if (SignupForm) {
        SignupForm.style.display ="block";
        event.stopPropagation();
    }
    if (LoginForm) {
        LoginForm.style.display ="none";
    }
    LoginCheckAlert1.style.display = "none";
};

const SwitchLogIn = (event) => {
    //console.log("dnawindaw");
    if (LoginForm) {
        LoginForm.style.display ="block";
        event.stopPropagation();
    }
    if (SignupForm) {
        SignupForm.style.display ="none";
    }
    LoginCheckAlert2.style.display = "none";
};

//*Value Checks

const ValueCheck = (event) => {
    // Check if any of the inputs are empty
    console.log("Checking...")
    if (LoginForm.style.display == "block") {
        console.log("login check")
        if (!emailCheck1 || !passCheck1) {
            console.log('An input element is missing from the form.');
            return;
        }
        if (emailCheck1.value.trim() === '' || passCheck1.value.trim() === '') {
            //alert("Oh, something's missing! Please complete all fields...");
            LoginCheckAlert1.style.display = "block";
            return;
        }
        else {signinUser()}
    }
    else {
        console.log("sign up check")
        if (!nickCheck2 || !emailCheck2 || !passCheck2) {
            alert('An input element is missing from the form.');
            return;
        }
        if (nickCheck2.value.trim() === '' || emailCheck2.value.trim() === '' || passCheck2.value.trim() === '') {
            //alert("Oh, something's missing! Please complete all fields...");
            LoginCheckAlert2.style.display = "block";
            return;
        }
        else {createUser();}
    }
    
    if (!nickCheck2 || !emailCheck1 || !emailCheck2 || !passCheck1 || !passCheck2) {
        alert('An input element is missing from the form.');
        return;
    }
}

//** Display Errors

//Sign Up Errors

export function displayErrors1() {
    LoginCheckAlert2.style.display = "block";
    LoginCheckAlert2.textContent = 'Password is too weak. Please use a stronger one.';
}

export function displayErrors2() {
    LoginCheckAlert2.style.display = "block";
    LoginCheckAlert2.textContent = 'This email is already in use. Try logging in or use a different email.'
}

export function displayErrors3() {
    LoginCheckAlert2.style.display = "block";
    LoginCheckAlert2.textContent = 'The email address is not valid.';
}

export function displayErrors4() {
    LoginCheckAlert2.style.display = "block";
    LoginCheckAlert2.textContent = `Ops, something went wrong!`;
}

//Login Errors

export function displayErrors5() {
    LoginCheckAlert1.style.display = "block";
    LoginCheckAlert1.textContent = 'The email address is not valid.';
}

export function displayErrors6() {
    LoginCheckAlert1.style.display = "block";
    LoginCheckAlert1.textContent = "We can't seem to find an user with those credentials..."
}

export function displayErrors7() {
    LoginCheckAlert1.style.display = "block";
    LoginCheckAlert1.textContent = 'The password provided is wrong';
}


export function displayErrors8() {
    LoginCheckAlert1.style.display = "block";
    LoginCheckAlert1.textContent = `Ops, something went wrong!`;
}



// TODO Attach event listeners

//Switch

if (switchSignUp) {
    switchSignUp.addEventListener('click', SwitchSignUp);
}

if (switchLogin) {
    switchLogin.addEventListener('click', SwitchLogIn);
}

//Value Check

if (loginFinal4Check) {
    loginFinal4Check.addEventListener('click', ValueCheck);
}

if (signupFinal4Check) {
    signupFinal4Check.addEventListener('click', ValueCheck);
}
