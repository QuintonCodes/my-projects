import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FilterProps {
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  children: ReactNode;
}

const Filter = ({ value, onValueChange, label, children }: FilterProps) => {
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

export default Filter;
