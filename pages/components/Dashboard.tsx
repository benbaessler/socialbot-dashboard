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
import { FeedsContext } from "@/context/Feeds";
import { Guild, IInstance, IStats, IFeed } from "@/types";
import { getPictureUrl, numberToHex } from "@/utils";

interface Props {
  isUser: boolean;
}

const Dashboard = ({ isUser }: Props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const { guild } = useContext(GuildContext);
  const { channels, setChannels } = useContext(ChannelsContext);
  const { feeds, setFeeds } = useContext(FeedsContext);

  const [stats, setStats] = useState<IStats>();

  const [publicationsPosted, setPublicationPosted] = useState(0);
  const [profilesMonitored, setProfilesMonitored] = useState(0);

  // Add Feed Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateData = async (guild: Guild) => {
    setLoading(true);
    let response = await fetch(`/api/database/getData/?guildId=${guild.id}`);
    const { instances, stats } = await response.json();

    response = await fetch(`/api/discord/getChannels/?guildId=${guild.id}`);

    const channels = await response.json();

    // TODO: Get profile data
    const profileIds = (instances ?? []).map((i: IInstance) =>
      numberToHex(Number(i.profileId))
    );

    // Split profileIds into batches of 5
    const batchSize = 5;
    const profileIdBatches = [];
    for (let i = 0; i < profileIds.length; i += batchSize) {
      const batch = profileIds.slice(i, i + batchSize);
      profileIdBatches.push(batch);
    }

    // Fetch profiles for each batch of profile IDs asynchronously
    const fetchProfileBatches = profileIdBatches.map((batch) => {
      const params = new URLSearchParams();
      params.append("profileIds", batch.join(","));

      return fetch(`/api/lens/getProfiles/?profileIds=${params.toString()}`)
        .then((response) => response.json())
        .then((data) => data.profiles.items);
    });

    // Wait for all profile batches to resolve
    const profileBatches = await Promise.all(fetchProfileBatches);

    const profiles = profileBatches.flat();

    const _feeds: IFeed[] = (instances ?? []).map((instance: IInstance) => {
      const profile = profiles.find(
        // @ts-ignore
        (p) => p.id === numberToHex(Number(instance.profileId))
      );

      return {
        name: profile.name ?? "Name",
        handle: instance.handle,
        // @ts-ignore
        channelName: channels.find((c) => c.id === instance.channelId).name,
        channelId: instance.channelId,
        mirrors: instance.includeMirrors,
        collects: instance.includeInteractions,
        mentions: instance.mention,
        imageUrl:
          getPictureUrl(profile) ??
          "https://p7.hiclipart.com/preview/355/848/997/computer-icons-user-profile-google-account-photos-icon-account.jpg",
      };
    });

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
    // @ts-ignore
    setFeeds(_feeds);
    setStats(stats);
    setProfilesMonitored(_profilesMonitored);
    setLoading(false);
  };

  useEffect(() => {
    if (guild) {
      updateData(guild);
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guild, isUser]);

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
        <div className="flex flex-col space-y-4 bg-slate-800 p-10 rounded-xl">
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
          {!isUser && <span className="text-lg">
            {
              "It looks like you're not using Lens Echo yet, invite the bot to your server "
            }
            <a
              href="https://lensecho.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-500 font-semibold"
            >
              here
            </a>
          </span>}
        </div>
        {isUser && (
          <>
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
                  <h2 className="text-xl font-semibold">
                    Feeds ({feeds.length})
                  </h2>
                  <IconButton
                    onClick={onOpen}
                    className="lg:hidden !important"
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
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
