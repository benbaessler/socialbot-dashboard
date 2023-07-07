import { useSession } from "next-auth/react";
import { IconButton, useDisclosure } from "@chakra-ui/react";

import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";

import { AddIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";

import Card from "./Card";
import FeedItem from "./FeedItem";
import AddFeed from "./AddFeed";
import FeedModal from "./FeedModal";
import { useContext, useEffect, useState } from "react";
import { GuildContext } from "@/context/Guild";
import { ChannelsContext } from "@/context/Channels";
import { Guild, IInstance, IStats, IFeed } from "@/types";

const Dashboard = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const { guild } = useContext(GuildContext);
  const { channels, setChannels } = useContext(ChannelsContext);

  const [feeds, setFeeds] = useState<IFeed[]>([]);
  const [stats, setStats] = useState<IStats>();

  const [publicationsPosted, setPublicationPosted] = useState(0);
  const [profilesMonitored, setProfilesMonitored] = useState(0);

  // Add Feed Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateData = async (guild: Guild) => {
    let response = await fetch(`/api/database/getData/?guildId=${guild.id}`);
    const { instances, stats } = await response.json();

    response = await fetch(`/api/discord/getChannels/?guildId=${guild.id}`);

    const channels = await response.json();

    const feeds: IFeed[] = instances.map((instance: IInstance) => ({
      name: "Name",
      handle: instance.handle,
      // @ts-ignore
      channelName: channels.find((c) => c.id === instance.channelId).name,
      channelId: instance.channelId,
      mirrors: instance.includeMirrors,
      collects: instance.includeInteractions,
      mentions: instance.mention,
      imageUrl:
        "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    }));

    // TODO
    // const profileIds = instances.map((i: IInstance) =>
    //   numberToHex(Number(i.profileId))
    // );

    // const params = new URLSearchParams();
    // params.append("profileIds", profileIds.join(","));

    // response = await fetch(
    //   `/api/getProfilePictures/?profileIds=${params.toString()}`
    // );

    // const profilePictures = await response.json();
    // console.log(profilePictures);

    const { postsPosted, commentsPosted, mirrorsPosted, collectsPosted } =
      stats;
    setPublicationPosted(
      postsPosted + commentsPosted + mirrorsPosted + collectsPosted
    );

    const _profilesMonitored = [
      ...new Set(instances.map((i: IInstance) => i.handle)),
    ].length;

    // @ts-ignore
    setChannels(channels.filter((c) => c.type === 0));
    setFeeds(feeds);
    setStats(stats);
    setProfilesMonitored(_profilesMonitored);
    setLoading(false);
  };

  useEffect(() => {
    if (guild) {
      updateData(guild);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guild]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner thickness="5px" speed="0.7s" color="white" size="xl" />
      </div>
    );
  }
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
              value={stats?.commandsUsed ?? 0}
              bg="bg-red-600"
            />
          </div>
        </div>

        <div className="flex lg:max-h-128">
          <AddFeed className="hidden lg:flex mr-6 w-1/3 p-7" />

          <div className="flex flex-col bg-slate-800 py-7 px-10 rounded-xl flex-1 w-2/3">
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
            <div className="w-full space-y-4 relative overflow-y-auto scrollbar-hide">
              {feeds.map((feed: IFeed, index: number) => (
                <FeedItem key={index.toString()} data={feed} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
