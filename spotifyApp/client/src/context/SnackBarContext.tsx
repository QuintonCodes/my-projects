import { Alert, Snackbar } from "@mui/material";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface SnackbarContextType {
  showMessage: (
    message: string,
    severity: "error" | "success" | "info" | "warning"
  ) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
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
      <Snackbar autoHideDuration={6000} onClose={handleClose} open={open}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
