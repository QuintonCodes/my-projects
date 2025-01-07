import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const Form = () => {
  return (
    <div className="xl:w-[54%] order-2 xl:order-none">
      <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
        <h3 className="text-4xl text-accent">Let`s work together</h3>
        <p className="text-white/60">Contact me using this form</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input type="firstname" placeholder="Firstname" />
          <Input type="lastname" placeholder="Lastname" />
          <Input type="email" placeholder="Email Address" />
          <Input type="phone" placeholder="Phone number" />
        </div>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select a service</SelectLabel>
              <SelectItem value="est">Web Development</SelectItem>
              <SelectItem value="cst">Software Development</SelectItem>
              <SelectItem value="mst">Logo Design</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Textarea className="h-[150px]" placeholder="Type your message here." />
        <Button size="lg" className="max-w-40">
          Send message
        </Button>
      </form>
    </div>
  );
};

export default Form;
