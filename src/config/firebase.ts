import { type FirebaseOptions, initializeApp } from "firebase/app";
import { GoogleAuthProvider,  getAuth } from "firebase/auth";
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

export const auth= getAuth(app)

export const googleProvider = new GoogleAuthProvider();

export const messaging = getMessaging(app);

export const getMessageToken = async (
	setTokenFound: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
	try {
		const currentToken = await getToken(messaging, { vapidKey: import.meta.env.VITE_MESSAGINGKEY });
		if (currentToken) {
			//"current fcm token for client: ", currentToken
			setTokenFound(currentToken);
		} else {
			//'No registration token available. Request permission to generate one.'
			setTokenFound(undefined);
		}
	} catch (err) {
		console.log("An error occurred while retrieving token. ", err);
	}
};

export const onMessageListener = (): Promise<MessagePayload> =>
	new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			resolve(payload);
		});
	});
