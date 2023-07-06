import Image from "next/image";

import LogoutIcon from "@mui/icons-material/Logout";
import LogoImage from "@/assets/logo.png";

import { Select, Button } from "@chakra-ui/react";

import { useSession, signOut } from "next-auth/react";
import { useContext } from "react";
import { GuildContext } from "@/context/context";
import { Guild } from "@/types";

const Navbar = ({ guilds }: any) => {
  const { data: session, status } = useSession();
  const { guild, setGuild } = useContext(GuildContext);

  const handleGuildChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGuildId = event.target.value;
    const selectedGuild = guilds.find(
      (guild: Guild) => guild.id === selectedGuildId
    );
    setGuild(selectedGuild);
  };

  return (
    <nav className="flex w-full p-4 justify-between">
      <div className="flex items-center">
        <a
          href="https://lenster.xyz/u/lensecho"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={LogoImage} alt="Lens Echo" width={40} />
        </a>
        <div className="bg-slate-700 py-2 px-4 rounded-full ml-3 text-sm font-semibold">
          Version 1.2.5
        </div>
      </div>

      <div className="flex gap-3">
        <Select defaultValue={guild} onChange={handleGuildChange}>
          {guilds?.map((guild: Guild) => (
            <option key={guild.id} value={guild.id}>
              {guild.name}
            </option>
          ))}
        </Select>
        <button
          className="flex bg-gray-800 hover:bg-gray-900 text-white py-2 px-5 rounded-md"
          onClick={() => signOut()}
        >
          <div className="pr-2">
            <LogoutIcon fontSize="small" />
          </div>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
