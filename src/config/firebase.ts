import { type FirebaseOptions, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {
	type MessagePayload,
	getToken,
	onMessage,
	getMessaging,
} from "firebase/messaging";

export const firebaseConfig: FirebaseOptions = {
	apiKey: import.meta.env.VITE_apiKey,
	authDomain: import.meta.env.VITE_authDomain,
	projectId: import.meta.env.VITE_projectId,
	storageBucket: import.meta.env.VITE_storageBucket,
	messagingSenderId: import.meta.env.VITE_messageSenderId,
	appId: import.meta.env.VITE_appId,
	measurementId: import.meta.env.VITE_measurementId,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//TODO: https://blog.logrocket.com/push-notifications-react-firebase/
export const messaging = getMessaging(app);

export const getMessageToken = (
	setTokenFound: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
	return getToken(messaging, { vapidKey: import.meta.env.VITE_MESSAGINGKEY })
		.then((currentToken) => {
			if (currentToken) {
				console.log("current fcm token for client: ", currentToken);
				setTokenFound(currentToken);
			} else {
				//console.log('No registration token available. Request permission to generate one.');
				setTokenFound(undefined);
				// shows on the UI that permission is required
			}
		})
		.catch((err) => {
			console.log("An error occurred while retrieving token. ", err);
			// catch error while creating client token
		});
};

export const onMessageListener = (): Promise<MessagePayload> =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});
