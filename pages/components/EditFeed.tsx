import { useContext, useEffect } from "react";
import { Button, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { ChannelsContext } from "@/context/Channels";
import { GuildContext } from "@/context/Guild";
import { FeedsContext } from "@/context/Feeds";
import { IFeed } from "@/types";

interface Props {
  className: string;
  feed: IFeed;
  onClose: () => void;
}

interface Options {
  comments: boolean;
  mirrors: boolean;
  collects: boolean;
  mentions: boolean;
}

const EditFeed = ({ className, feed, onClose }: Props) => {
  const { channels } = useContext(ChannelsContext);
  const { guild } = useContext(GuildContext);
  const { feeds } = useContext(FeedsContext);
  const [invalidInput, setInvalidInput] = useState(true);

  const [options, setOptions] = useState<Options>({
    comments: feed?.comments,
    mirrors: feed?.mirrors,
    collects: feed?.collects,
    mentions: feed?.mentions,
  });

  const defaultValue = Object.keys(options).filter(
    (key) => options[key as keyof Options]
  );

  const handleCheckboxChange = (value: keyof Options) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [value]: !prevOptions[value],
    }));
  };

  const handleSubmit = async () => {
    console.log(feeds);
    const _feeds = feeds;
    const feedIndex = _feeds.findIndex(
      // @ts-ignore
      (f) => f.handle == feed?.handle && f.channelId == feed?.channelId
    );

    _feeds[feedIndex].comments = options.comments;
    _feeds[feedIndex].mirrors = options.mirrors;
    _feeds[feedIndex].collects = options.collects;
    _feeds[feedIndex].mentions = options.mentions;

    const response = await fetch(
      "/api/database/update?" +
        new URLSearchParams({
          guildId: guild.id,
          handle: feed?.handle,
          channelId: channels.find(
            // @ts-ignore
            (channel) => channel.name == feed?.channelName
          ).id,
          comments: options.comments.toString(),
          mirrors: options.mirrors.toString(),
          collects: options.collects.toString(),
          mentions: options.mentions.toString(),
        }),
      {
        method: "POST",
      }
    );

    if (response.status == 200) onClose();
  };

  useEffect(() => {
    if (
      options.comments == feed?.comments &&
      options.mirrors == feed?.mirrors &&
      options.collects == feed?.collects &&
      options.mentions == feed?.mentions
    ) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return (
    <div className={`${className} flex-col space-y-5 bg-slate-800 rounded-xl`}>
      <span className="font-semibold mr-2">Handle: @{feed?.handle}</span>
      <span className="font-semibold mr-2">Channel: #{feed?.channelName}</span>
      <div>
        <div className="flex items-center mb-2">
          <span className="font-semibold mr-2">Options</span>
          <span className="text-sm text-slate-400">
            Specify monitor options.
          </span>
        </div>
        <CheckboxGroup colorScheme="blue" defaultValue={defaultValue}>
          <Stack direction={["column"]}>
            <Checkbox
              value="comments"
              isChecked={options.comments}
              onChange={() => handleCheckboxChange("comments")}
            >
              Include Comments
            </Checkbox>
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

      <Button
        colorScheme="green"
        variant="solid"
        isDisabled={invalidInput}
        onClick={handleSubmit}
      >
        Confirm
      </Button>
    </div>
  );
};

export default EditFeed;
