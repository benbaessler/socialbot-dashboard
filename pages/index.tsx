import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

import { useSession, signIn } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

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
