import { useContext } from "react";
import { FetchingContext } from "@/context/Fetching";
import { Skeleton } from "@chakra-ui/react";

interface Props {
  title: string;
  icon: any;
  value: number;
  bg: string;
}

const Card = ({ title, icon, value, bg }: Props) => {
  const { fetching, setFetching } = useContext(FetchingContext);

  return (
    <div className={`w-full max-w-xs rounded-lg p-5 mb-5 ${bg}`}>
      <h2 className="text-md">{title}</h2>
      <div className="flex mt-3 items-center">
        {icon}
        <Skeleton isLoaded={!fetching} className="ml-3 w-24">
          <span className="text-3xl">{value}</span>
        </Skeleton>
      </div>
    </div>
  );
};

export default Card;
