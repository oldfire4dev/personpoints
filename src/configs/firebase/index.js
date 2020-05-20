import firebase from 'firebase';

const settings = {
    apiKey: "AIzaSyAbBa4ZYzHIs-hnLxUPBhkIAhGAumjXG6U",
    authDomain: "personpoints2020.firebaseapp.com",
    databaseURL: "https://personpoints2020.firebaseio.com",
    projectId: "personpoints2020",
    storageBucket: "personpoints2020.appspot.com",
    messagingSenderId: "774400349200",
    appId: "1:774400349200:web:53c0a04989ece6d5a26695",
    measurementId: "G-PNLSSK04X7"
};

if (!firebase.apps.length) {
    firebase.initializeApp(settings);
}

export default firebase;