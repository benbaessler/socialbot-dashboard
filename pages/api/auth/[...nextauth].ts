import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import DiscordProvider from 'next-auth/providers/discord';
require("dotenv").config();

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'identify guilds'
        }
      }
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
