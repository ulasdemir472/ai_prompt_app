import { connectToDb } from "@/utils/db";
import Prompt from "@/models/prompt";

export const GET = async (req, { params }) => {
  try {
    connectToDb();

    const posts = await Prompt.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch users data", { status: 500 });
  }
};
