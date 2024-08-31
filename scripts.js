// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCIPtHcmFwV1NQ95_w4uz-SqA62yqbWEq",
    authDomain: "jashoreshop-1bd50.firebaseapp.com",
    databaseURL: "https://jashoreshop-1bd50-default-rtdb.firebaseio.com",
    projectId: "jashoreshop-1bd50",
    storageBucket: "jashoreshop-1bd50.appspot.com",
    messagingSenderId: "538389037858",
    appId: "1:538389037858:web:7477721bd6a484174f1b7b",
    measurementId: "G-M2KVL1M6SN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const chatContainer = document.getElementById('chat-container');
    const loginContainer = document.getElementById('login-container');
    const chatMessages = document.getElementById('chatMessages');
    const fileInput = document.getElementById('fileInput');
    const logoutButton = document.getElementById('logoutButton');

    const loginCredentials = {
        TanvirTheBoss: 'Tanvir222',
        AbuzarTheMaster: 'Abuzar234',
        SrizonTheLegend: 'Srizon999',
        SalmanTheKing: 'Salman1335'
    };

    const users = {
        TanvirTheBoss: 'Tanvir',
        AbuzarTheMaster: 'Abuzar',
        SrizonTheLegend: 'Srizon',
        SalmanTheKing: 'Salman'
    };

    loginButton.addEventListener('click', function () {
        const loginKey = document.getElementById('loginKey').value;
        const password = document.getElementById('password').value;

        if (loginCredentials[loginKey] === password) {
            loginContainer.style.display = 'none';
            chatContainer.style.display = 'block';

            // Load existing messages
            firebase.database().ref('messages').on('child_added', function (snapshot) {
                const messageData = snapshot.val();
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `<span class="user">${messageData.user}:</span> ${messageData.message} <span class="time">${messageData.time}</span>`;
                chatMessages.appendChild(messageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
            });
        } else {
            alert('Invalid login credentials');
        }
    });

    sendButton.addEventListener('click', function () {
        const message = messageInput.value;
        if (message.trim() === '') {
            alert('Message cannot be empty');
            return;
        }

        const timestamp = new Date().toLocaleTimeString();
        const user = users[document.getElementById('loginKey').value];
        const newMessageKey = firebase.database().ref().child('messages').push().key;

        firebase.database().ref('messages/' + newMessageKey).set({
            user: user,
            message: message,
            time: timestamp
        });

        messageInput.value = '';
    });

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
            const storageRef = firebase.storage().ref('uploads/' + file.name);
            storageRef.put(file).then(function (snapshot) {
                alert('File uploaded successfully!');
            }).catch(function (error) {
                console.error('File upload failed:', error);
                alert('File upload failed. Please try again.');
            });
        }
    });

    logoutButton.addEventListener('click', function () {
        loginContainer.style.display = 'block';
        chatContainer.style.display = 'none';
        document.getElementById('loginKey').value = '';
        document.getElementById('password').value = '';
    });
});
