import { Link } from "react-router-dom";
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

interface MessageProps {
  actionText: string;
  cancelButton: boolean;
  description: string;
  location: string;
  onClose: () => void;
  title: string;
}

const Message = ({
  actionText,
  cancelButton,
  description,
  location,
  onClose,
  title,
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
