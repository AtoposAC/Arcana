import { tarotReadingHandler } from "../server.js";

export default async function handler(request, response) {
  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST, OPTIONS");
    response.status(405).json({ error: "Method not allowed." });
    return;
  }

  await tarotReadingHandler(request, response);
}
