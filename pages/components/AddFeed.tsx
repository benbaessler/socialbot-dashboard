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
import { useState } from "react";

interface Props {
  className: string;
  editMode?: boolean;
}

interface Options {
  mirrors: boolean;
  collects: boolean;
  mentions: boolean;
}

const AddFeed = ({ className, editMode }: Props) => {
  // Test data
  const channelNames = ["general", "random", "announcements", "lens-updates"];

  // Checkbox handlers
  const [options, setOptions] = useState<Options>({
    mirrors: false,
    collects: false,
    mentions: false,
  });

  const handleCheckboxChange = (value: keyof Options) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [value]: !prevOptions[value],
    }));
  };

  return (
    <div className={`${className} flex-col space-y-5 bg-slate-800 rounded-xl`}>
      {!editMode && (
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
            <Input />
          </InputGroup>
        </div>
      )}
      <div>
        <div className="flex items-center mb-2">
          <span className="font-semibold mr-2">Channel</span>
          <span className="text-sm text-slate-400">
            The channel to send updates to.
          </span>
        </div>
        <Select placeholder="Select a channel">
          {channelNames.map((channelName) => (
            <option key={channelName} value={channelName}>
              #{channelName}
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

      <Button
        colorScheme="green"
        variant="solid"
        onClick={() => console.log(options)}
      >
        {editMode ? "Confirm" : "Start monitor"}
      </Button>
    </div>
  );
};

export default AddFeed;
