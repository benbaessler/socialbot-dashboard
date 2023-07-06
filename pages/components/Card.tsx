interface Props {
  title: string;
  icon: any;
  value: number;
  bg: string;
}

const Card = ({ title, icon, value, bg }: Props) => {
  return (
    <div className={`w-full max-w-xs rounded-lg p-5 mb-5 ${bg}`}>
      <h2 className="text-md">{title}</h2>
      <div className="flex mt-3 items-center">
        {icon}
        <span className="text-3xl ml-3">{value}</span>
      </div>
    </div>
  );
};

export default Card;