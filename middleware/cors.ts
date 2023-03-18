import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
  origin:
    process.env.NODE_ENV === "production"
      ? "https://studio.apollographql.com"
      : "*",
  credentials: true,
});

export default function corsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse 
) {
  return new Promise<void>((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}
