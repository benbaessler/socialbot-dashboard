import { useSession } from "next-auth/react";
import { IconButton, useDisclosure } from "@chakra-ui/react";

import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";

import { AddIcon } from "@chakra-ui/icons";

import Card from "./Card";
import FeedItem, { FeedItemProps } from "./FeedItem";
import AddFeed from "./AddFeed";
import FeedModal from "./FeedModal";

const Dashboard = () => {
  const { data: session } = useSession();

  // Test data
  const publicationsPosted = 420;
  const profilesMonitored = 10;
  const commandsUsed = 45;

  const discordUsername = "Ben#1234";

  const feeds: FeedItemProps[] = [
    {
      name: "Ben",
      handle: "benbaessler",
      channelName: "lens",
      mirrors: true,
      collects: true,
      mentions: true,
      imageUrl: "https://avatars.githubusercontent.com/u/78696428?v=4",
    },
    {
      name: "Ben",
      handle: "benbaessler",
      channelName: "lens",
      mirrors: true,
      collects: true,
      mentions: true,
      imageUrl: "https://avatars.githubusercontent.com/u/78696428?v=4",
    },
    {
      name: "Ben",
      handle: "benbaessler",
      channelName: "lens",
      mirrors: true,
      collects: true,
      mentions: true,
      imageUrl: "https://avatars.githubusercontent.com/u/78696428?v=4",
    },
  ];

  // Add Feed Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <FeedModal isOpen={isOpen} onClose={onClose} />
      <div className="flex flex-col p-10 w-full max-w-6xl space-y-6">
        <div className="bg-slate-800 p-10 rounded-xl">
          <h1 className="text-3xl font-bold mb-4">
            Welcome back,{" "}
            <span className="text-blue-400">{session?.user?.name}</span>! 👋
          </h1>
          <span>
            <span className="font-semibold">
              You can manage your Lens Echo settings, activity and view usage
              statistics here.
            </span>{" "}
            If you need help getting started, you can start by reading through
            Lens Echo’s{" "}
            <a
              href="https://docs.lenspedia.xyz/getting-started/tools/lens-echo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 hover:text-sky-400"
            >
              documentation
            </a>
            .
          </span>
        </div>

        <div className="bg-slate-800 py-7 px-10 rounded-xl">
          <h2 className="text-xl font-semibold mb-7">Overview</h2>
          <div className="flex flex-wrap gap-x-4 justify-center">
            <Card
              title="Publications posted"
              icon={<QuestionAnswerIcon fontSize="large" />}
              value={publicationsPosted}
              bg="bg-sky-700"
            />
            <Card
              title="Profiles monitored"
              icon={<PersonIcon fontSize="large" />}
              value={profilesMonitored}
              bg="bg-green-600"
            />
            <Card
              title="Commands used"
              icon={<KeyboardCommandKeyIcon fontSize="large" />}
              value={commandsUsed}
              bg="bg-red-600"
            />
          </div>
        </div>

        <div className="flex">
          <AddFeed className="hidden lg:flex mr-6 w-1/3 p-7" />

          <div className="bg-slate-800 py-7 px-10 rounded-xl flex-1 w-2/3">
            <div className="flex justify-between w-full items-center mb-7">
              <h2 className="text-xl font-semibold">Feeds ({feeds.length})</h2>
              <IconButton
                onClick={onOpen}
                className="lg:hidden"
                aria-label="Add feed"
                colorScheme="blue"
                icon={<AddIcon color="white" boxSize={5} />}
              />
            </div>
            <div className="w-full space-y-4 relative">
              {feeds.map((feed: FeedItemProps, index: number) => (
                <FeedItem
                  key={index.toString()}
                  name={feed.name}
                  handle={feed.handle}
                  channelName={feed.channelName}
                  imageUrl={feed.imageUrl}
                  mirrors={feed.mirrors}
                  collects={feed.collects}
                  mentions={feed.mentions}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
