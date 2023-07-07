import { useState, useEffect, useContext } from "react";

import { Spinner } from "@chakra-ui/react";

import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";

import { useSession, signIn } from "next-auth/react";
import { getOwnedGuilds } from "@/utils/discord";
import { GuildContext } from "@/context/Guild";

export default function Home() {
  const { data: session, status } = useSession();
  const { guild, setGuild } = useContext(GuildContext);
  const [guilds, setGuilds] = useState();

  const [isUser, setIsUser] = useState(false);

  const findCommonValues = (arr1: string[], arr2: string[]) =>
    arr1.filter((value: string) => arr2.includes(value));

  const fetchData = async () => {
    const ownedGuilds = await getOwnedGuilds((session as any)?.accessToken);

    if (ownedGuilds.length == 0) return;

    const response = await fetch("/api/database/getBotGuilds");
    const data = await response.json();

    const botGuildIds = findCommonValues(
      ownedGuilds.map((g: any) => g.id),
      data.guilds
    );

    const botGuilds = ownedGuilds.filter((g: any) => botGuildIds.includes(g.id));

    if (botGuilds.length == 0) return;

    setIsUser(true);
    setGuilds(botGuilds);
    setGuild(botGuilds[0]);
  };

  useEffect(() => {
    if (status == "authenticated") {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (status == "unauthenticated") {
    return <SignIn />;
  } else {
    return (
      <main>
        <Navbar guilds={guilds} />
        <div className="flex justify-center">
          <Dashboard isUser={isUser} />
        </div>
      </main>
    );
  }
}
