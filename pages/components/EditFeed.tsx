import { useContext } from "react";
import {
  Select,
  Button,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChannelsContext } from "@/context/Channels";
import { IFeed } from "@/types";

interface Props {
  className: string;
  feed: IFeed;
}

interface Options {
  mirrors: boolean;
  collects: boolean;
  mentions: boolean;
}

const EditFeed = ({ className, feed }: Props) => {
  const { channels } = useContext(ChannelsContext);

  // TODO: Fix checkbox initial values
  const [options, setOptions] = useState<Options>({
    mirrors: feed.mirrors,
    collects: feed.collects,
    mentions: feed.mentions,
  });

  console.log(options);

  const handleCheckboxChange = (value: keyof Options) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [value]: !prevOptions[value],
    }));
  };

  return (
    <div className={`${className} flex-col space-y-5 bg-slate-800 rounded-xl`}>
      <span className="font-semibold mr-2">Handle: @{feed.handle}</span>
      <div>
        <div className="flex items-center mb-2">
          <span className="font-semibold mr-2">Channel</span>
          <span className="text-sm text-slate-400">
            The channel to send updates to.
          </span>
        </div>
        <Select defaultValue={feed.channelName}>
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
              isChecked={true}
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
        onClick={() => console.log(options)}
      >
        Confirm
      </Button>
    </div>
  );
};

export default EditFeed;
