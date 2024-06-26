import { Card, CardContent } from "./ui/card";

interface ItemProps {
  text: string;
}

const Item = ({ text }: ItemProps) => {
  return (
    <Card className="w-1/4 transform transition-transform duration-300 hover:scale-105 cu">
      <CardContent className="flex aspect-square items-center justify-center p-6">
        <span className="text-2xl font-semibold">{text}</span>
      </CardContent>
    </Card>
  );
};

export default Item;
