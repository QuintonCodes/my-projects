import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FilterProps {
  children: ReactNode;
  label: string;
  onValueChange: (value: string) => void;
  value: string;
}

const Filter = ({ children, label, onValueChange, value }: FilterProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="bg-transparent">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="bg-[#D6D6D6]">
        <SelectGroup>
          <SelectLabel className="text-[#7F1310]">{label}</SelectLabel>
          {children}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const FilterItem = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  return (
    <SelectItem value={value} className="cursor-pointer">
      {children}
    </SelectItem>
  );
};

Filter.FilterItem = FilterItem;

export default Filter;
