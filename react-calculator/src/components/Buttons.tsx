const colorMap = {
  orange: "#f2a33c",
  red: "red",
  grey: "#5a5a5a",
} as const;

type ButtonColor = keyof typeof colorMap;

interface ButtonsProps {
  color?: ButtonColor;
  handleClick: (input: string) => void;
  symbol: string;
  flex?: number;
}

const Buttons = ({
  color = "grey",
  handleClick,
  symbol,
  flex = 1,
}: ButtonsProps) => {
  return (
    <div
      className="items-center rounded-[25px] text-white cursor-pointer flex flex-[1] text-2xl h-20 justify-center m-1"
      style={{ backgroundColor: colorMap[color], flex }}
      onClick={() => handleClick(symbol)}
    >
      {symbol}
    </div>
  );
};

export default Buttons;
