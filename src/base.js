import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyB9BYEQv1zE6X8pvEz61u6jTFW7oWDwE3Q",
	authDomain: "web-build-demo.firebaseapp.com",
	projectId: "web-build-demo",
	storageBucket: "web-build-demo.appspot.com",
	messagingSenderId: "214332608732",
	appId: "1:214332608732:web:0cacf1badf0d64c89ca419",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
