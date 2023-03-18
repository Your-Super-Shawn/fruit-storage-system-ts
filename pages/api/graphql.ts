import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { schema } from "@/graphql/nexus";
import corsMiddleware from "@/middleware/cors";
import connectMongo from "@/utils/connectMongo";

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") {
    await corsMiddleware(req, res);
    return res.status(200).end();
  }

  await corsMiddleware(req, res);

  // Connect to MongoDB before handling the request
  await connectMongo();

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
