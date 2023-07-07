import Image from "next/image";

import { useContext } from "react";
import { IconButton, useDisclosure } from "@chakra-ui/react";
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

  const icons = [];
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

  return (
    <>
      <FeedModal isOpen={isOpen} onClose={onClose} editFeed={data} />
      <div className="flex justify-between items-center p-4 bg-slate-600 rounded-lg space-between">
        <div className="flex items-center">
          <Image
            src={data?.imageUrl}
            alt={data?.handle}
            width={55}
            height={55}
            className="rounded-full mr-3"
          />
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{data?.name}</span>
              <span className="text-sm text-slate-300">@{data?.handle}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="text-blue-600 bg-gray-400	py-1 px-2 rounded-full">
                #{data?.channelName}
              </div>
              {...icons}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <IconButton
            onClick={onOpen}
            aria-label="edit"
            colorScheme="blue"
            variant='ghost'
            icon={<EditIcon color="white" boxSize={5} />}
          />
          <IconButton
            onClick={handleDelete}
            aria-label="delete"
            colorScheme="red"
            variant='ghost'
            icon={<CloseIcon color="white" />}
          />
        </div>
      </div>
    </>
  );
};

export default FeedItem;
