import { useState, useEffect, use } from "react";

import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

import { useSession, signIn } from "next-auth/react";
import { getOwnedGuilds } from "./getGuilds";

export default function Home() {
  const { data: session, status } = useSession();

  const [guilds, setGuilds] = useState();

  useEffect(() => {
    if (status == "authenticated") {
      getOwnedGuilds((session as any)?.accessToken).then((guilds) => {
        setGuilds(guilds);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status == "unauthenticated") {
    signIn("discord");
  } else {
    return (
      <main>
        <Navbar />
        <div className="flex justify-center">
          <Dashboard />
        </div>
      </main>
    );
  }
}
