import Prompt from "@/models/prompt";
import { connectToDb } from "@/utils/db";

export const GET = async (req, res) => {
  try {
    await connectToDb();
    const posts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch data!", { status: 500 });
  }
};
