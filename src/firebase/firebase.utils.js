import firebase from 'firebase/app';
import 'firebase/firestore'; // For database
import 'firebase/auth'; // For authentication

// Configuration data which we took from Firebase
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

firebase.initializeApp(config);

// Creating User Profile
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

// We can use this function to add collection and documents into firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey)

	const batch = firestore.batch()
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc()
		batch.set(newDocRef,obj)
	})

	return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map(doc => {
		const {title, items} = doc.data()
		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		}
	})

	return transformedCollection.reduce((acc, collection) => {
		acc[collection.title.toLowerCase()] = collection;
		return acc
	} , {})
}

// When you refreshing checking persistence (if user signed in still will be signed in with using local storage)
export const getCurrentUser = () => {
	return new Promise((resolve,reject) => {
		const unsubscribe = auth.onAuthStateChanged(userAuth => {
			unsubscribe()
			resolve(userAuth)
		}, reject)
	})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// Google Sign In Authentication
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase;
