// Import Firebase's app initialization functions.
import { initializeApp, getApps } from 'firebase/app';
// Import the Firestore functions needed to connect to the database and read documents.
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Create the Firebase configuration using the values stored in the local environment file.
const firebaseConfig = {
// Store the Firebase API key from the environment file.
apiKey: process.env.FIREBASE_API_KEY,
// Store the Firebase authentication domain from the environment file.
authDomain: process.env.FIREBASE_AUTH_DOMAIN,
// Store the Firebase project ID from the environment file.
projectId: process.env.FIREBASE_PROJECT_ID,
// Store the Firebase storage bucket from the environment file.
storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// Store the Firebase messaging sender ID from the environment file.
messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
// Store the Firebase application ID from the environment file.
appId: process.env.FIREBASE_APP_ID,
// Finish the Firebase configuration object.
};

// Initialize Firebase only if it has not already been initialized.
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
// Create a connection to the Firestore database.
const db = getFirestore(app);

// Create a function that retrieves and sorts all posts from Firestore.
export async function getSortedPostsData() {
// Get all documents from the posts collection.
const snapshot = await getDocs(collection(db, 'posts'));
// Convert the Firestore documents into regular JavaScript objects.
const allPostsData = snapshot.docs.map((doc) => ({
// Use the Firestore document ID as the post ID.
id: doc.id,
// Add the remaining fields from the Firestore document.
...doc.data(),
// Finish the post object.
}));
// Sort the posts from newest date to oldest date.
return allPostsData.sort((a, b) => {
// Compare the dates of the two posts being sorted.
return new Date(b.date) - new Date(a.date);
// Finish the sorting function.
});
// Finish the getSortedPostsData function.
}