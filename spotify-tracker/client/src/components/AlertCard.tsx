import { Alert, AlertTitle } from "@mui/material";

interface AlertCardProps {
  alertText: string;
  severity: "error" | "warning" | "info" | "success";
  title: string;
}

const AlertCard = ({ alertText, severity, title }: AlertCardProps) => {
  return (
    <Alert severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {alertText}
    </Alert>
  );
};

export default AlertCard;
