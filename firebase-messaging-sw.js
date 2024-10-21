importScripts(
    "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
);
importScripts(
    "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
// This file is a stub. a proper version will be generated in public and dist folders at build time
const firebaseConfig = {
	apiKey: "INSERT_API_KEY_HERE",
	authDomain: "INSERT_AUTH_DOMAIN_HERE",
	projectId: "INSERT_PROJECT_ID_HERE",
	storageBucket: "INSERT_STORAGE_BUCKET_HERE",
	messagingSenderId: "INSERT_MESSAGING_SENDER_ID_HERE",
	measurementId: "INSERT_MEASUREMENT_ID_HERE",
	appId: "INSERT_APP_ID_HERE",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();
const channel4Broadcast = new BroadcastChannel('channel4');
let notificationsEnabled = false;

channel4Broadcast.onmessage = (event) => {
    notificationsEnabled = event.data.notifications;
	console.log("event data", event.data);
}

messaging.onBackgroundMessage((payload) => {
	const notificationTitle = payload.notification.title;
	
	const notificationUrl = `INSERT_WEBURL_HERE${payload.data.path}/${payload.data.id}`;
	const notificationOptions = {
		body: payload.notification.body,
		actions: [{ action: "open_page", title: "Open" }],
		data: { url: notificationUrl },
	};
	self.addEventListener("notificationclick", (event) => {
		//if data is needed: const data = event.notification.data;
		event.notification.close();
		self.clients.openWindow(notificationUrl);
	});
	if (notificationsEnabled) {
		self.registration.showNotification(notificationTitle, notificationOptions);
	}
});