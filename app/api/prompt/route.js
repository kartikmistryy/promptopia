import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectToDB();
    
    const prompts = await Prompt.find({}).populate('creator').lean();
    
    // Add Cache-Control headers to disable caching
    return new Response(
      JSON.stringify(prompts), 
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store',
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }), 
      { status: 500 }
    );
  }
};
