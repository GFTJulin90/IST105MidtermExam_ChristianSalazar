



function authStateListener() {
    // [START auth_state_listener]
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            var uid = user.uid;
            // ...
            location.href = 'culturalconnections.html';
        } else {
            // User is signed out
            // ...

        }
    });
    // [END auth_state_listener]
}

window.addEventListener('load', function () {

    //Listen for auth state changes
    authStateListener();

    document.getElementById('sign-in-gmail').addEventListener('click', function () {

        let provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('email');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                console.log('Logging sucessfully', result.user);
                location.href = 'culturalconnections.html';
            })
            .catch(function (error) {
                console.log('Logging fail', error);
            });
    });


    
    document.getElementById('sign-in-login-password').addEventListener('click', function () {

        
        let email = document.getElementById('email').value;
        let pass = document.getElementById('password').value;

       
        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                // Signed in
                let user = userCredential.user;
                // ...               
                alert('Logging sucessfully');
                location.href = 'culturalconnections.html';
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert('Logging fail');
                console.log('Logging fail', errorMessage);
            });

    });




    document.getElementById('sign-in-phone').addEventListener('click', function () {
        const phoneNumber = getPhoneNumberFromUserInput();
            const appVerifier = window.recaptchaVerifier;

            const auth = getAuth();
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // ...
            }).catch((error) => {
            // Error; SMS not sent
            // ...
            });
        // [END auth_phone_signin_modular]


       
    });
});