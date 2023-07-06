import { useState, useEffect } from "react";

import { Spinner } from "@chakra-ui/react";

import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

import { useSession, signIn } from "next-auth/react";
import { getOwnedGuilds } from "@/utils/getGuilds";

export default function Home() {
  const { data: session, status } = useSession();

  const [guilds, setGuilds] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status == "authenticated") {
      getOwnedGuilds((session as any)?.accessToken).then((guilds) => {
        setGuilds(guilds);
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (status == "unauthenticated") {
    signIn("discord");
  } else {
    if (loading) {
      return (
        <div className="h-screen flex items-center justify-center">
          <Spinner
            thickness="5px"
            speed="0.7s"
            color="white"
            size="xl"
          />
        </div>
      );
    }
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
