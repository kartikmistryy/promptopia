import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";



const handler = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    cookies: {
        sessionToken: {
          name: `next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production',  
          },
        },
      },
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
    
        async signIn({ profile }) {
            try {
                await connectToDB()
                const emailExists = await User.findOne({
                    email: profile.email
                })
                const userExists = await User.findOne({
                    username: profile.name.replace(" ", "")
                })
    
                if(!userExists && !emailExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase() + Math.floor(Math.random() * 10),
                        image: profile.picture
                    })
                }
    
                return true
            }
            catch(err){
                console.log(err)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST  }