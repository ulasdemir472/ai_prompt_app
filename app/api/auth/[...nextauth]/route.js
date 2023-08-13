import { connectToDb } from "@/utils/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      //console.log(session);
      const sessionUser = await User.findOne({ email: session?.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDb();
        //console.log(profile);
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          await User.create({
            username: profile.name.replace(" ", "").toLowerCase(),
            email: profile.email,
            image: profile.picture,
          });
        }
        // OR
        // const newUser = new User({
        //   username: profile.name.replace(" ", "").toLowerCase(),
        //   email: profile.email,
        //   image: profile.picture,
        // });
        // newUser.save();
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
