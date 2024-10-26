import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET Prompt by ID
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) {
            return new Response(JSON.stringify({ error: "Prompt not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
};

// PATCH (Update) Prompt by ID
export const PATCH = async (request, { params }) => {
    const { prompt: updatedPrompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response(JSON.stringify({ error: "Prompt not found" }), { status: 404 });
        }

        existingPrompt.prompt = updatedPrompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to update prompt", details: err.message }), { status: 500 });
    }
};

// DELETE Prompt by ID
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);
        return new Response(JSON.stringify({ message: "Prompt deleted successfully" }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: "Failed to delete prompt", details: err.message }), { status: 500 });
    }
};
