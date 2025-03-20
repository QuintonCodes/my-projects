import { toast } from "react-toastify";

export const useToaster = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      autoClose: 5000,
      className: "bg-neutral-800 border border-[#00ff99]/60 font-sans",
      closeOnClick: true,
      draggable: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: "bottom-right",
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      autoClose: 5000,
      className: "bg-neutral-800 border border-red-500/60 font-sans",
      closeOnClick: true,
      draggable: true,
      hideProgressBar: false,
      pauseOnHover: true,
      position: "bottom-right",
    });
  };

  return {
    showError,
    showSuccess,
  };
};
