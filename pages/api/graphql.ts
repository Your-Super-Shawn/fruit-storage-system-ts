import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "@/graphql/nexus";
import corsMiddleware from "@/middleware/cors";
import connectMongo from "@/utils/connectMongo";

/**
 * @description The purpose of it is to create a GraphQL
 * API that can handle client requests and execute queries and
 * mutations on the application's data.
 */

// Create an ApolloServer instance with the schema and context
const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
});

// Start the ApolloServer instance
const startServer = apolloServer.start();

// Define the request handler for the Next.js API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle preflight CORS requests with the OPTIONS method
  if (req.method === "OPTIONS") {
    await corsMiddleware(req, res);
    return res.status(200).end();
  }

  // Apply CORS middleware to the request and response
  await corsMiddleware(req, res);

  // Connect to MongoDB before handling the request
  await connectMongo();

  // Wait for the ApolloServer instance to start before handling the request
  await startServer;
  // Create a request handler for the ApolloServer instance and apply it to the request and response
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

// Configure the Next.js API route to disable the built-in body parser.
// Because there is a conflict in ApolloServer that prevents it from working with the built-in body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
