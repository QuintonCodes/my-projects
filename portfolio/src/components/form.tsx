"use client";

import { useContactForm } from "@/hooks/useContactForm";
import { services } from "@/lib/data";
import { ContactFormData } from "@/lib/types";
import { Loader } from "lucide-react";
import FormField from "./form-field";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function Form() {
  const { control, handleSubmit, isLoading, onSubmit, register, errors } =
    useContactForm();

  const renderError = (field: keyof ContactFormData) => {
    const error = errors[field];
    if (error && "message" in error) {
      return <p className="text-red-500">{error.message as string}</p>;
    }
    return null;
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
            Fill out the form below, and I`ll get back to you as soon as
            possible.
          </p>
        </header>

        {/* Contact Information Inputs */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            fieldtype="input"
            placeholder="First Name"
            register={register("firstname")}
            renderError={() => renderError("firstname")}
            type="text"
          />
          <FormField
            fieldtype="input"
            placeholder="Last Name"
            register={register("lastname")}
            renderError={() => renderError("lastname")}
            type="text"
          />
          <FormField
            autoComplete="email"
            fieldtype="input"
            placeholder="Email Address"
            register={register("email")}
            renderError={() => renderError("email")}
            type="email"
          />
          <FormField
            autoComplete="phone"
            fieldtype="input"
            placeholder="Phone Number"
            register={register("phone")}
            renderError={() => renderError("phone")}
            type="text"
          />
        </div>

        {/* Service Selection */}
        <FormField
          control={control}
          fieldtype="select"
          name="service"
          options={services}
          renderError={() => renderError("service")}
        />

        {/* Message Textarea */}
        <div>
          <Textarea
            className="h-[150px]"
            placeholder="Type your message here."
            {...register("message")}
          />
          {renderError("message")}
        </div>

        {/* Submit Button */}
        <div className="flex gap-6">
          <Button
            className="max-w-40"
            disabled={isLoading}
            size="lg"
            type="submit"
          >
            {isLoading ? <Loader className="animate-spin" /> : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
}
