"use client";

import { FolderPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateFolderModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = () => {
    if (!folderName.trim()) {
      toast.error("Please enter a folder name");
      return;
    }

    toast.success(`Created folder "${folderName}"`);
    setOpen(false);
    setFolderName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="glass backdrop-blur-[1px] hover:bg-primary/10"
          >
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-dark backdrop-blur-md sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Create New Folder
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Organize your playlists by creating folders
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="folder-name" className="text-foreground">
              Folder Name
            </Label>
            <Input
              id="folder-name"
              placeholder="My Folder"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="glass backdrop-blur-[1px]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateFolder();
                }
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="glass backdrop-blur-[1px] hover:bg-primary/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateFolder}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Create Folder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
