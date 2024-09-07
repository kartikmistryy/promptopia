import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";
import User from '@models/user'

export const GET = async(request, { params }) => {
    try{
        await connectToDB()

        const user = await User.find({username: params.username})
        const userId = user[0]._id.toString()
        const prompts = await Prompt.find({
            creator: userId
        }).populate('creator');
        console.log(prompts)
        return new Response(JSON.stringify(prompts), {status: 200})
    }
    catch(err) {
        return new Response(err, {status: 502})
    }
}

