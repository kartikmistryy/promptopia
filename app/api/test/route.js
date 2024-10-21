import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user"; // Ensure User model is imported

export const GET = async (request) => {
  try {
    await connectToDB();
    
    // Fetch all prompts and populate the creator field with user data
    const testPrompts = await Prompt.find({}).populate("creator").lean();
    
    return new Response(JSON.stringify(testPrompts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
