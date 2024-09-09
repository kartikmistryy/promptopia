import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";
import User from "@models/user";
import mongoose from "mongoose";

export const GET = async(request) => {
    try{
        await connectToDB()
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200})
    }
    catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }), // Return error message as JSON
            { status: 500 } // Use 500 for internal server error
        );
    }
}