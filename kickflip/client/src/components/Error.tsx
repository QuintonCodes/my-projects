import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const Error = ({ productsError }: { productsError: Error | null }) => {
  return (
    <Alert variant="destructive" className="w-96">
      <AlertCircle className="h-6 w-6" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{productsError?.message}</AlertDescription>
    </Alert>
  );
};

export default Error;
