import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCKmmfUWL3MzqPSjY6X3pDnLV0BtDFAEsM",
  authDomain: "crwn-db-ecdf0.firebaseapp.com",
  databaseURL: "https://crwn-db-ecdf0.firebaseio.com",
  projectId: "crwn-db-ecdf0",
  storageBucket: "crwn-db-ecdf0.appspot.com",
  messagingSenderId: "760688374619",
  appId: "1:760688374619:web:2cf43475d9ed114f38e07e",
  measurementId: "G-L8VD32VCGG",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  console.log(userRef);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ pormpt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
