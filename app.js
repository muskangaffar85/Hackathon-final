// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCNfe6t6KpR1DdZc-dLObuhE2BG0q3n2M",
    authDomain: "web-app-project-bb6e8.firebaseapp.com",
    databaseURL: "https://web-app-project-bb6e8-default-rtdb.firebaseio.com",
    projectId: "web-app-project-bb6e8",
    storageBucket: "web-app-project-bb6e8.firebasestorage.app",
    messagingSenderId: "995424022140",
    appId: "1:995424022140:web:06e32105de5453973223f9",
    measurementId: "G-J6KGXDDV6Q"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getDatabase(app);

// Function to write data to Realtime Database
function writePost(postTitle, postContent) {
    const postRef = ref(db, 'posts/' + new Date().toISOString());
    set(postRef, {
        title: postTitle,
        content: postContent,
        createdAt: new Date().toISOString()
    });
}

// Event listener for the form submission
document.getElementById('postForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const postTitle = document.getElementById('post-title').value;
    const postContent = document.getElementById('post-content').value;
    if (postTitle && postContent) {
        writePost(postTitle, postContent);
        alert('Post added successfully!');
    } else {
        alert('Please fill in all fields.');
    }
});


// Event listener for sign-up form
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User signed up:', userCredential.user);
            alert('Sign-up successful');
        })
        .catch((error) => {
            console.error('Error signing up:', error.code, error.message);
            alert('Error: ' + error.message);
        });
});

// Event listener for login form
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User logged in:', userCredential.user);
            alert('Login successful');
        })
        .catch((error) => {
            console.error('Error logging in:', error.code, error.message);
            alert('Error: ' + error.message);
        });
});



// Post form event listener
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const postTitle = document.getElementById('post-title').value;
    const postContent = document.getElementById('post-content').value;

    if (postTitle.trim() === '' || postContent.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }

    // Save the data to localStorage
    const post = {
        title: postTitle,
        content: postContent
    };
    localStorage.setItem('savedPost', JSON.stringify(post));

    // Display confirmation
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.textContent = 'Post saved locally!';
    confirmationMessage.style.display = 'block';

    // Clear the form
    document.getElementById('postForm').reset();
});

