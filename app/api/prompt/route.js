import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
    try {
        await connectToDB();
        console.log(process.env.NEXTAUTH_URL)
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(
            JSON.stringify(prompts),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store, max-age=0',
                    'Pragma': 'no-cache'
                  }
            }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store' // Disable caching for error responses as well
                }
            }
        );
    }
};
