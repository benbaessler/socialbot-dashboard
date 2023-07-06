import Image from "next/image";

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

export interface FeedItemProps {
  name: string;
  handle: string;
  channelName: string;
  mirrors: boolean;
  collects: boolean;
  mentions: boolean;
  imageUrl: string;
}

const FeedItem = ({
  name,
  handle,
  channelName,
  mirrors,
  collects,
  mentions,
  imageUrl,
}: FeedItemProps) => {
  // Edit Feed Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const icons = [];
  if (mentions)
    icons.push(
      <OptionIcon
        title={"Mentions everyone"}
        icon={<AtSignIcon fontSize="small" />}
      />
    );
  if (mirrors)
    icons.push(
      <OptionIcon
        title={"Mirrors included"}
        icon={<RepeatIcon fontSize="small" />}
      />
    );
  if (collects)
    icons.push(
      <OptionIcon
        title={"Collects included"}
        icon={<CopyIcon fontSize="small" />}
      />
    );

  return (
    <>
      <FeedModal isOpen={isOpen} onClose={onClose} editMode />
      <div className="flex justify-between items-center p-4 bg-slate-600 rounded-lg space-between">
        <div className="flex items-center">
          <Image
            src={imageUrl}
            alt={handle}
            width={55}
            height={55}
            className="rounded-full mr-3"
          />
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{name}</span>
              <span className="text-sm text-slate-300">@{handle}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="text-blue-600 bg-gray-400	py-1 px-2 rounded-full">
                #{channelName}
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
            icon={<EditIcon color="white" boxSize={5} />}
          />
          <IconButton
            aria-label="delete"
            colorScheme="blue"
            icon={<CloseIcon color="white" />}
          />
        </div>
      </div>
    </>
  );
};

export default FeedItem;
