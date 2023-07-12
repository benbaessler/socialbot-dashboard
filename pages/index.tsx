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
  const [loading, setLoading] = useState(true);

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
      fetchData().then(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  return (
    <>
      <Head>
        <title>Lens Echo - Dashboard</title>
        <meta
          name="description"
          content="View and manage your Lens Echo activity + statistics."
        />
      </Head>
      <main className="bg-black">
        {status == "unauthenticated" ? (
          <SignIn />
        ) : loading ? (
          <div className="h-screen flex items-center justify-center">
            <Spinner thickness="5px" speed="0.7s" color="white" size="xl" />
          </div>
        ) : (
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
