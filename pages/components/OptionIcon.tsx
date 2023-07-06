// import { Tooltip } from '@chakra-ui/react'

interface Props {
  title: string;
  icon: JSX.Element;
}

const OptionIcon = ({ title, icon }: Props) => (
  // <Tooltip
  //   title={title}
  //   hasArrow
  // >
  <div>{icon}</div>
  // </Tooltip>
);

export default OptionIcon;
