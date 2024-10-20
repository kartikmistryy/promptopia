// api/prompt/new
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { prompt, userId, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      prompt,
      creator: userId,
      tag,
    });

    await newPrompt.save();

    console.log("New prompt created:", newPrompt); // Log new data creation
    
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
