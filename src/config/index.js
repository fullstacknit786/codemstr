
const secrets = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyDjixaFCQuVr0suchz9UqlEeHb5XvXJFFs",
        authDomain: "testapp-b4ae6.firebaseapp.com",
        databaseURL: "https://testapp-b4ae6.firebaseio.com",
        projectId: "testapp-b4ae6",
        storageBucket: "testapp-b4ae6.appspot.com",
        messagingSenderId: "826765921026",
        appId: "1:826765921026:web:d7dc97f902a4652231101b",
        measurementId: "G-G97TN6ND2Q"
    };

    return {
        firebaseConfig
    };

};

const { firebaseConfig } = secrets();
export { firebaseConfig };
