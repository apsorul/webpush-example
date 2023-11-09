import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const SUBSCRIBE_TO_PUSH_MUTATION = gql`
	mutation WebPushSubscribe($subscription: SubscriptionInput!) {
		webPushSubscribe(subscription: $subscription)
	}
`;


function App() {
	useEffect(() => {
		if ("serviceWorker" in navigator && "PushManager" in window) {
			navigator.serviceWorker
				.register('./sw.js')
				.then((registration) => {
					return registration.pushManager
						.getSubscription()
						.then(async (subscription) => {
							if (subscription) {
								console.log(subscription.toJSON());
								return subscription;
							}

							const pushServerPublicKey =
								"BBjAPt8UUiHtQ0Gq_QOGIFenpP430cOI2IMcwT0DNTlOO9MLzYgnB6xwmSqqF3LacYthwX-8lOPPY9sBHfhOSBg";

							const newSubscription =
								await registration.pushManager.subscribe({
									userVisibleOnly: true,
									applicationServerKey: pushServerPublicKey,
								});
							// Отправить подписку на сервер через GraphQL мутацию
							subscribeToPush({
								variables: { subscription: {
									endpoint: newSubscription.endpoint,
									keys: newSubscription.toJSON().keys
								} },
							});
						});
				})
				.catch((error) => {
					console.error("Service Worker registration failed:", error);
				});
		}
	}, []);

   const [subscribeToPush] = useMutation(SUBSCRIBE_TO_PUSH_MUTATION);

	return (
		<div>
			<h1>Service Workers!</h1>
		</div>
	);
}

export default App;
