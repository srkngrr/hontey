import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyDuDDKGmBxpYR2SfWy18Tys8WhJBFCgv7k",
	authDomain: "hontey-db.firebaseapp.com",
	databaseURL: "https://hontey-db.firebaseio.com",
	projectId: "hontey-db",
	storageBucket: "hontey-db.appspot.com",
	messagingSenderId: "1008259579892",
	appId: "1:1008259579892:web:c4e4a621d559c2e74e43a1",
	measurementId: "G-JRMDSFYSZZ"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get()

	if (!snapShot.exists) {
		const {displayName, email} = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (error) {
			console.log('error creating user', error.message)
		}
	}
	
	return userRef
} 

firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// Google Sign In Authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;