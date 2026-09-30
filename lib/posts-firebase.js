// Import the Firebase app functions needed to initialize Firebase.
import { getApps, initializeApp } from 'firebase/app';

// Import the Firestore functions needed to access the database.
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Import the Firebase configuration values from the environment variables.
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase only when an app has not already been initialized.
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Create a connection to the Firestore database.
const db = getFirestore(app);

// Create a function that retrieves and sorts all posts from Firestore.
export async function getSortedPostsData() {
  // Get all documents from the posts collection.
  const snapshot = await getDocs(collection(db, 'posts'));

  // Convert the Firestore documents into regular JavaScript objects.
  const allPostsData = snapshot.docs.map(function(doc) {
    // Get all fields stored in the current Firestore document.
    const postData = doc.data();

    // Combine the document ID with the remaining post data.
    return Object.assign({ id: doc.id }, postData);
  });

  // Sort the posts from newest date to oldest date.
  return allPostsData.sort(function(a, b) {
    // Compare the dates of the two posts being sorted.
    return new Date(b.date) - new Date(a.date);
  });
}