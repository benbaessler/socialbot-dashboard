import Image from "next/image";

import { useContext } from "react";
import {
  IconButton,
  useDisclosure,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  AtSignIcon,
  CloseIcon,
  CopyIcon,
  EditIcon,
  RepeatIcon,
} from "@chakra-ui/icons";

import OptionIcon from "./OptionIcon";
import FeedModal from "./FeedModal";
import { IFeed } from "@/types";
import { GuildContext } from "@/context/Guild";
import { FeedsContext } from "@/context/Feeds";

interface Props {
  data: IFeed;
}

const FeedItem = ({ data }: Props) => {
  // Edit Feed Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { guild } = useContext(GuildContext);
  const { feeds, setFeeds } = useContext(FeedsContext);
  const [isSmScreen] = useMediaQuery("(max-width: 640px)");

  const icons: any[] = [];
  if (data?.mentions)
    icons.push(
      <OptionIcon
        title={"Mentions everyone"}
        icon={<AtSignIcon fontSize="small" />}
      />
    );
  if (data?.mirrors)
    icons.push(
      <OptionIcon
        title={"Mirrors included"}
        icon={<RepeatIcon fontSize="small" />}
      />
    );
  if (data?.collects)
    icons.push(
      <OptionIcon
        title={"Collects included"}
        icon={<CopyIcon fontSize="small" />}
      />
    );

  const handleDelete = async () => {
    const newFeeds = feeds.filter(
      (feed: IFeed) =>
        feed.handle !== data?.handle || feed.channelId !== data?.channelId
    );
    setFeeds(newFeeds);

    await fetch(
      "api/database/delete?" +
        new URLSearchParams({
          guildId: guild.id,
          handle: data?.handle,
          channelId: data?.channelId,
        }),
      {
        method: "POST",
      }
    );
  };

  const FeedOptions = ({ style }: { style: string }) => (
    <div className={`${style} items-center space-x-3 text-xs sm:text-sm`}>
      <div className="text-blue-600 bg-gray-400	py-1 px-2 rounded-full line-clamp-1">
        #{data?.channelName}
      </div>
      {...icons}
    </div>
  );

  const IconActionButtons = () => (
    <div className="flex space-x-2">
      <IconButton
        onClick={onOpen}
        aria-label="edit"
        colorScheme="blue"
        variant="ghost"
        icon={<EditIcon color="white" boxSize={5} />}
      />
      <IconButton
        onClick={handleDelete}
        aria-label="delete"
        colorScheme="red"
        variant="ghost"
        icon={<CloseIcon color="white" />}
      />
    </div>
  );

  return (
    <>
      <FeedModal isOpen={isOpen} onClose={onClose} editFeed={data} />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-slate-600 rounded-lg space-between gap-2">
        <div className="flex items-center ">
          <Image
            src={data?.imageUrl}
            alt={data?.handle}
            width={25}
            height={25}
            className="rounded-full mr-3 sm:h-12 sm:w-12"
          />
          <div className="space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="text-sm sm:text-base font-semibold">
                {data?.name}
              </span>
              <span className="text-xs sm:text-sm text-slate-300">
                @{data?.handle}
              </span>
            </div>
            <FeedOptions style="hidden sm:flex" />
          </div>
        </div>
        <FeedOptions style="flex sm:hidden" />
        {isSmScreen ? (
          <div className="flex flex-grow w-full gap-2 mt-2">
            <Button colorScheme="blue" size="sm" flex="1" onClick={onOpen}>
              Edit
            </Button>
            <Button colorScheme="red" size="sm" flex="1" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        ) : (
          <IconActionButtons />
        )}
      </div>
    </>
  );
};

export default FeedItem;
