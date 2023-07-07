import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
require("dotenv").config();

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify guilds",
        },
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, profile }: any) => {
      if (account) {
        token.accessToken = account.access_token;
        token.tokenType = account.token_type;
      }
      if (profile) {
        token.profile = profile;
      }
      return token;
    },
    // @ts-ignore
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.tokenType = token.tokenType;
      session.discordUser = token.profile;

      return session;
    },
  },
  secret: "thisisasecret"
};

export default NextAuth(authOptions);
