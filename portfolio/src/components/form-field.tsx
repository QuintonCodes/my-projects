import { FormFieldProps } from "@/lib/types";
import { Controller } from "react-hook-form";
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

export default function FormField(props: FormFieldProps) {
  if (props.fieldtype === "input") {
    const { placeholder, register, type, renderError, ...rest } = props;
    return (
      <div>
        <Input placeholder={placeholder} type={type} {...rest} {...register} />
        {renderError && renderError(register.name)}
      </div>
    );
  } else if (props.fieldtype === "select") {
    const { control, name, options, renderError } = props;
    return (
      <div>
        <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field }) => (
            <>
              <Select
                aria-label="Select a service"
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    {options.map((option, index) => (
                      <SelectItem key={index} value={option.title}>
                        {option.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <input name={name} type="hidden" value={field.value} />
            </>
          )}
        />
        {renderError && renderError(name)}
      </div>
    );
  }
  return null;
}
