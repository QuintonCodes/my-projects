import { ContactFormData, contactSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToaster } from "./useToaster";

export const useContactForm = () => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const { showError, showSuccess } = useToaster();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      const response = await axios.post("/api/send-email", data);

      if (response.status !== 200) {
        throw new Error(response.data.error || "An unknown error occurred.");
      }

      showSuccess("Message sent successfully!");
      reset();
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      reset();
    }
  };

  return {
    register,
    handleSubmit,
    control,
    isLoading: isSubmitting,
    onSubmit,
    errors,
  };
};
