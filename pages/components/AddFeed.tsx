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
import { ChannelsContext } from "@/context/Channels";

interface Props {
  className: string;
}

interface Options {
  mirrors: boolean;
  collects: boolean;
  mentions: boolean;
}

const AddFeed = ({ className }: Props) => {
  // Test data
  const { channels } = useContext(ChannelsContext);

  const [invalidHandle, setInvalidHandle] = useState(false);

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
    console.log(handle, options, channel);

    const res = await fetch(`/api/getProfile?handle=${handle}`);
    const profile = await res.json();

    if (profile == null) {
      console.log("!")
      return setInvalidHandle(true);
    }

    setInvalidHandle(false);
  };

  return (
    <div className={`${className} flex-col space-y-5 bg-slate-800 rounded-xl`}>
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

      <Button colorScheme="green" variant="solid" onClick={handleSubmit} isDisabled={!handle || !channel}>
        Start monitor
      </Button>
    </div>
  );
};

export default AddFeed;
