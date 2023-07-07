import {
  Input,
  InputLeftElement,
  InputGroup,
  Select,
  Button,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { useState, useContext } from "react";
import { GuildContext } from "@/context/Guild";
import { ChannelsContext } from "@/context/Channels";
import { FeedsContext } from "@/context/Feeds";
import { hexToNumber, getPictureUrl, parseHandle } from "@/utils";
import { IFeed } from "@/types";

interface Props {
  className: string;
  onClose?: () => void;
}

interface Options {
  mirrors: boolean;
  collects: boolean;
  mentions: boolean;
}

const AddFeed = ({ className, onClose }: Props) => {
  const { channels } = useContext(ChannelsContext);
  const { guild } = useContext(GuildContext);
  const { feeds, setFeeds } = useContext(FeedsContext);

  const [invalidHandle, setInvalidHandle] = useState(false);
  const [error, setError] = useState("");

  const [channel, setChannel] = useState<any>();
  const [handle, setHandle] = useState("");
  const [options, setOptions] = useState<Options>({
    mirrors: false,
    collects: false,
    mentions: false,
  });

  const handleInputChange = (event: any) => setHandle(event.target.value);

  const handleCheckboxChange = (value: keyof Options) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [value]: !prevOptions[value],
    }));
  };

  const handleSubmit = async () => {
    const duplicate = feeds.some(
      (feed: IFeed) =>
        feed.handle == parseHandle(handle) && feed.channelId == channel.id
    );

    if (duplicate) return setError("This feed already exists.");
    setError("");

    const res = await fetch(`/api/lens/getProfile?handle=${handle}`);
    const profile = await res.json();

    if (profile == null) {
      return setInvalidHandle(true);
    }
    setInvalidHandle(false);

    const _feeds = [
      {
        name: profile.name,
        handle: profile.handle,
        channelName: channel.name,
        channelId: channel.id,
        mirrors: options.mirrors,
        collects: options.collects,
        mentions: options.mentions,
        imageUrl: getPictureUrl(profile),
      } as IFeed,
      ...feeds,
    ];

    setFeeds(_feeds);

    setHandle("");
    setChannel(undefined);
    setOptions({
      mirrors: false,
      collects: false,
      mentions: false,
    } as Options);

    if (onClose) onClose();

    await fetch(
      "/api/database/create?" +
        new URLSearchParams({
          guildId: guild.id,
          channelId: channel.id,
          handle: profile.handle,
          profileId: hexToNumber(profile.id),
          ownedBy: profile.ownedBy,
          includeMirrors: options.mirrors.toString(),
          includeInteractions: options.collects.toString(),
          mention: options.mentions.toString(),
        }),
      {
        method: "POST",
      }
    );
  };

  return (
    <div
      className={`${className} flex-col justify-between bg-slate-800 rounded-xl`}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">Handle</span>
            <span className="text-sm text-slate-400">
              The Lens profile handle to add.
            </span>
          </div>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <AtSignIcon />
            </InputLeftElement>
            <Input
              value={handle}
              onChange={handleInputChange}
              isInvalid={invalidHandle}
            />
          </InputGroup>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">Channel</span>
            <span className="text-sm text-slate-400">
              The channel to send updates to.
            </span>
          </div>
          <Select
            placeholder="Select a channel"
            value={channel?.name || "Select a channel"}
            onChange={(e) => {
              setChannel(
                channels.find((channel: any) => channel.name == e.target.value)
              );
            }}
          >
            {channels.map((channel: any) => (
              <option key={channel.id} value={channel.name}>
                #{channel.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <span className="font-semibold mr-2">Options</span>
            <span className="text-sm text-slate-400">
              Specify monitor options.
            </span>
          </div>
          <CheckboxGroup colorScheme="blue">
            <Stack direction={["column"]}>
              <Checkbox
                value="mirrors"
                isChecked={options.mirrors}
                onChange={() => handleCheckboxChange("mirrors")}
              >
                Include Mirrors
              </Checkbox>
              <Checkbox
                value="collects"
                isChecked={options.collects}
                onChange={() => handleCheckboxChange("collects")}
              >
                Include Collects
              </Checkbox>
              <Checkbox
                value="mentions"
                isChecked={options.mentions}
                onChange={() => handleCheckboxChange("mentions")}
              >
                Mention everyone
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-sm text-red-800 my-3">{error}</span>
        <Button
          colorScheme="green"
          variant="solid"
          onClick={handleSubmit}
          isDisabled={!handle || !channel}
        >
          Start monitor
        </Button>
      </div>
    </div>
  );
};

export default AddFeed;
