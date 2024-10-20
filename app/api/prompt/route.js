import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator');

    // Ensure caching is disabled
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Expires': '0',
        'Pragma': 'no-cache',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
};
