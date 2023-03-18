import { ApolloServer } from "apollo-server-micro";
import { schema } from "./nexus";

const server = new ApolloServer({
  schema, // Use the Nexus-generated schema
  context: ({ req, res }) => ({ req, res }), // Add context if needed
});

export default server;
