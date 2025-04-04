import { IoMdClose } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "./ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onChange,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-20 bg-neutral-900/90 backdrop-blur-sm" />
        <DialogContent className="fixed drop-shadow-md border border-neutral-700 top-1/2 left-1/2 max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] -translate-1/2 rounded-md bg-neutral-800 p-[25px] focus:outline-none z-30">
          <DialogTitle className="mb-4 text-xl font-bold text-center">
            {title}
          </DialogTitle>
          <DialogDescription className="mb-5 text-sm leading-normal text-center">
            {description}
          </DialogDescription>
          <div>{children}</div>
          <DialogClose asChild>
            <button className="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none">
              <IoMdClose />
            </button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
