"use client";

import emailjs from "@emailjs/browser";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
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

// Form validation schema
const schema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  service: yup.string().required("Please select a service"),
  message: yup.string().required("Message is required"),
});

// Form data interface
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [formStatus, setFormStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (
    data: FormData,
    e: React.BaseSyntheticEvent | undefined
  ) => {
    setIsLoading(true);
    try {
      if (!e?.target) throw new Error("Form reference is missing");

      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.target,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setFormStatus({ success: true, message: "Message sent successfully!" });
      reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      setFormStatus({
        success: false,
        message: "Failed to send the message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderError = (field: keyof FormData) => {
    return errors[field] ? (
      <p className="text-red-500">{errors[field]?.message}</p>
    ) : null;
  };

  return (
    <div className="xl:w-[54%] order-2 xl:order-none">
      <form
        className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Header Section */}
        <header>
          <h3 className="text-4xl text-accent">Get in Touch</h3>
          <p className="text-white/60">
            Fill out the form below, and I’ll get back to you as soon as
            possible.
          </p>
        </header>

        {/* Contact Information Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              type="text"
              placeholder="First Name"
              {...register("firstname")}
            />
            {renderError("firstname")}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Last Name"
              {...register("lastname")}
            />
            {renderError("lastname")}
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email Address"
              {...register("email")}
            />
            {renderError("email")}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Phone Number"
              {...register("phone")}
            />
            {renderError("phone")}
          </div>
        </div>

        {/* Service Selection */}
        <div>
          <Controller
            name="service"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="Web Development">
                      Web Development
                    </SelectItem>
                    <SelectItem value="Software Development">
                      Software Development
                    </SelectItem>
                    <SelectItem value="Logo Design">Logo Design</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {renderError("service")}
        </div>

        {/* Message Textarea */}
        <div>
          <Textarea
            className="h-[150px]"
            placeholder="Type your message here."
            {...register("message")}
          />
          {renderError("message")}
        </div>

        {/* Submit Button and Status Message */}
        <div className="flex gap-6">
          <Button
            size="lg"
            className="max-w-40"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="animate-spin" /> : "Send Message"}
          </Button>

          {formStatus && (
            <p
              className={`mt-4 ${
                formStatus.success ? "text-green-500" : "text-red-500"
              }`}
            >
              {formStatus.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
