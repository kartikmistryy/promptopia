import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";
import User from "@models/user";
import mongoose from "mongoose";

export const GET = async(request, { params }) => {
    try{
        await connectToDB()
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200})
    }
    catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }), 
            { status: 500 }
        );
    }
}