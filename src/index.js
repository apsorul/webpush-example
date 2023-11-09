import { createRoot } from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql", // Замените на ваш GraphQL-сервер
	cache: new InMemoryCache(),
	headers: {
		authorization: "at_edc2fd2c04693de156e58239f43c3a5e8f4f5ace72526",
	},
});

const root = createRoot(document.getElementById("root"));

root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
