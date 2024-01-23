import { useState, ChangeEvent } from "react";

export const useFormInput = <T>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return [formData, handleInputChange, setFormData] as const;
};
