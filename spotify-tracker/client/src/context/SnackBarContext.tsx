import React, { createContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarProviderProps {
  children: ReactNode;
}

interface SnackbarContextType {
  showMessage: (
    message: string,
    severity: "error" | "success" | "info" | "warning"
  ) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("info");

  const showMessage = (
    message: string,
    severity: "error" | "success" | "info" | "warning"
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
