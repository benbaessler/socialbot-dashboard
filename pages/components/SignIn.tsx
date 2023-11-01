import Image from "next/image";
import LogoImage from "@/assets/logo.png";
import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center justify-center max-w-4/5 p-8 w-96 h-96 bg-slate-800 rounded-lg">
        <Image
          src={LogoImage}
          alt="Logo"
          width={120}
          height={120}
          className="mb-12"
        />
        <div className="flex flex-col gap-2 w-full">
          <Button
            onClick={() => signIn("discord")}
            colorScheme="facebook"
            variant="solid"
            className="text-white"
          >
            Sign In with Discord
          </Button>

          <Button colorScheme="green" variant="solid" className="text-white">
            <a href="https://socialbot.gg">Invite bot</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
