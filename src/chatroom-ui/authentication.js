import errorMessage from './errorMessage';

const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const chatroomUI = document.getElementsByClassName('chat-container')[0];
const form = document.getElementsByClassName('authentication')[0];

// Show errors
const error = new errorMessage;
error.init();

// Login
btnLogin.addEventListener('click', e => {
    // Get email and pass value
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => {
        if(e.code == "auth/user-not-found"){
            error.show('There is no user record corresponding to this identifier. Please sign up');
        } else if (e.code == "auth/wrong-password"){
            error.show('Invalid password');
        } else if (e.code == "auth/invalid-email"){
            error.show('Invalid email');
        }
        console.log(e);
    });
});

// SignUp
btnSignUp.addEventListener('click', e => {
    // Get email and pass value
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => {
        if(e.code == "auth/email-already-in-use"){
            error.show(e.message);
        } else if (e.code == "auth/invalid-email"){
            error.show('Invalid email');
        }
        console.log(e);
    });
});

// Logout
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    chatroomUI.classList.add('invisible');
    form.classList.remove('invisible');
});

// Add a realtime listener
firebase.auth().onAuthStateChanged(user => {
    if(user) {
        chatroomUI.classList.remove('invisible');
        form.classList.add('invisible');
        localStorage.setItem('author', user.uid);
    } else {
        form.classList.remove('invisible');
    }
});