import { ApolloClient, InMemoryCache } from "@apollo/client";

// Create an ApolloClient instance
const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

// Wrap the root component with the ApolloProvider and pass the client instance to it
export default client;
