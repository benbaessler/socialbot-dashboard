import { Tooltip } from "@chakra-ui/react";

interface Props {
  title: string;
  icon: JSX.Element;
}

const OptionIcon = ({ title, icon }: Props) => (
  // <Tooltip label={title} placement="bottom" hasArrow>
    <div className="cursor-pointer">{icon}</div>
  // {/* </Tooltip> */}
);

export default OptionIcon;
