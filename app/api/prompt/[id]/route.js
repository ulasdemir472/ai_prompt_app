import Prompt from "@/models/prompt";
import { connectToDb } from "@/utils/db";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const post = await Prompt.findById(params.id).populate("creator");

    if (!post) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch data!", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDb();

    const post = await Prompt.findById(params.id);
    if (!post) return new Response("Prompt not found", { status: 404 });

    post.prompt = prompt;
    post.tag = tag;

    await post.save();

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt!", { status: 500 });
  }
};

export const DELETE = async ({ params }) => {
  try {
    await connectToDb();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Delete prompt succesfully!", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt!", { status: 500 });
  }
};
