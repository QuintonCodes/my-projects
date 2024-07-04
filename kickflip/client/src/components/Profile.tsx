import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { user } = useUser();

  return (
    <DialogContent
      className="max-w-[425px] bg-[#d6d6d6]"
      onOpenAutoFocus={(e: Event) => e.preventDefault}
    >
      <DialogHeader>
        <DialogTitle className="text-[#7F1310]">Edit Profile</DialogTitle>
        <DialogDescription className="text-black">
          Update your profile information here.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input
            id="username"
            defaultValue={user?.username || ""}
            className="col-span-3"
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            defaultValue={user?.email || ""}
            className="col-span-3"
            readOnly
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          type="submit"
          className="bg-[#292929] hover:bg-[#7F1310] hover:bg-opacity-90 hover:scale-110 transition duration-300 text-white hover:text-black"
        >
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default Profile;
