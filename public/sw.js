self.addEventListener("push", (event) => {
	const options = {
		body: event.data.text(),
		icon: "icon.png",
	};

	event.waitUntil(
		self.registration.showNotification("Push Notification", options)
	);
});

self.addEventListener("install", (event) => {
	console.log("Service Worker установлен");
});

self.addEventListener("activate", (event) => {
	console.log("Service Worker активирован");
});