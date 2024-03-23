importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
	apiKey: "AIzaSyDyAoCl_RFWGwPXw2WjVltlOOZZKJ7rD2g",
	authDomain: "camera-events-f329e.firebaseapp.com",
	projectId: "camera-events-f329e",
	storageBucket: "camera-events-f329e.appspot.com",
	messagingSenderId:
		"BJlLYkJsp5iij7Y8t3ZuuTWOetVQ5PgRE2pHB8xqpvM2ow3hK1tJi0hOa-bXes9UkLKmaowezmHha3cAWgBMK6k",
	appId: "1:248133674895:web:9f8c84fc22ac8810e98dfa",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log("Received background message ", payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});