import { useState, useEffect, useContext } from "react";

import { Spinner } from "@chakra-ui/react";

import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

import { useSession, signIn } from "next-auth/react";
import { getOwnedGuilds } from "@/utils/discord";
import { GuildContext } from "@/context/Guild";

export default function Home() {
  const { data: session, status } = useSession();
  const { guild, setGuild } = useContext(GuildContext);

  const [guilds, setGuilds] = useState();

  useEffect(() => {
    if (status == "authenticated") {
      getOwnedGuilds((session as any)?.accessToken).then((guilds) => {
        setGuilds(guilds);
        setGuild(guilds[0]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (status == "unauthenticated") {
    signIn("discord");
  } else {
    return (
      <main>
        <Navbar guilds={guilds} />
        <div className="flex justify-center">
          <Dashboard />
        </div>
      </main>
    );
  }
}
