import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Link } from "react-router-dom";

interface MessageProps {
  children?: ReactNode;
  title: string;
  description: string;
  cancelButton: boolean;
  location: string;
  actionText: string;
  onClose: () => void;
}

const Message = ({
  title,
  description,
  cancelButton,
  location,
  actionText,
  onClose,
}: MessageProps) => {
  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent className="bg-[#292929]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#7F1310]">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelButton && (
            <AlertDialogCancel className="bg-transparent text-white hover:text-black">
              Cancel
            </AlertDialogCancel>
          )}
          <Link to={`${location}`}>
            <AlertDialogAction className="bg-[#D6D6D6] text-black hover:bg-[#7F1310] hover:text-white">
              {actionText}
            </AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Message;
