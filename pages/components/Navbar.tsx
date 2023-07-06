import Image from "next/image";

import LogoutIcon from "@mui/icons-material/Logout";
import LogoImage from "@/assets/logo.png";

import { useSession, signOut } from "next-auth/react";

const Navbar = () => {

  const { data: session, status } = useSession();

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

      <button 
        className="flex bg-gray-700 hover:bg-gray-800 text-white py-2.5 px-5 rounded-lg"
        onClick={() => signOut()}
      >
        <div className="pr-2">
          <LogoutIcon fontSize="small" />
        </div>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
