import { useState, useEffect, useContext } from "react";

import Head from "next/head";

import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";

import { useSession, signIn } from "next-auth/react";
import { getOwnedGuilds } from "@/utils/discord";
import { GuildContext } from "@/context/Guild";
import { Spinner } from "@chakra-ui/react";

export default function Home() {
  const { data: session, status } = useSession();
  const { guild, setGuild } = useContext(GuildContext);
  const [guilds, setGuilds] = useState();
  const [loading, setLoading] = useState(false);

  const [isUser, setIsUser] = useState(false);

  const findCommonValues = (arr1: string[], arr2: string[]) =>
    arr1.filter((value: string) => arr2.includes(value));

  const fetchData = async () => {
    let ownedGuilds;
    try {
      ownedGuilds = await getOwnedGuilds((session as any)?.accessToken);
    } catch {
      // To refresh the access token
      signIn("discord");
    }

    if (ownedGuilds.length == 0) return;

    const response = await fetch("/api/database/getBotGuilds");
    const data = await response.json();

    const botGuildIds = findCommonValues(
      ownedGuilds.map((g: any) => g.id),
      data.guilds
    );

    const botGuilds = ownedGuilds.filter((g: any) =>
      botGuildIds.includes(g.id)
    );

    if (botGuilds.length == 0) return;

    setIsUser(true);
    setGuilds(botGuilds);
    setGuild(botGuilds[0]);
  };

  useEffect(() => {
    if (status == "authenticated") {
      setLoading(true);
      fetchData().then(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      <Head>
        <title>Dashboard • Social Bot</title>
        <meta
          name="description"
          content="View and manage your Social Bot activity + statistics."
        />
      </Head>
      <main className="bg-black">
        {loading && (
          <div className="h-screen flex items-center justify-center">
            <Spinner thickness="5px" speed="0.7s" color="white" size="xl" />
          </div>
        )}
        {status === "unauthenticated" && !loading && <SignIn />}
        {status === "authenticated" && !loading && (
          <>
            <Navbar guilds={guilds} />
            <div className="flex justify-center">
              <Dashboard isUser={isUser} />
            </div>
          </>
        )}
      </main>
    </>
  );
}
