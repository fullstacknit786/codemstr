const firebase = require("firebase");
require("firebase/auth")

require('firebase/storage');


const { Component } = require("react");
const { firebaseConfig } = require("../config");

class Firebase extends Component {
    constructor(props) {
        super(props);
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.auth = firebase.auth();
        this.storage = firebase.storage();
        this.db = firebase.firestore;
        this.provider = new firebase.auth.GoogleAuthProvider()
        // this.storage = fb.storage().ref();
        this.state = {
            currentUser: firebase.auth().currentUser
        };
    }


    isInitialized() {
        //console.log(this.auth.onAuthStateChanged(resolve))
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        });
    }


}

export default new Firebase();