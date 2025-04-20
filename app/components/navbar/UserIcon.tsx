import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "../../utils/context/store";
import { User as UserIconSVG } from "lucide-react"; 

const UserIcon = ({ user }: { user: User }) => {
  const imageUrl = user.spotifyImageUrl;

  return (
    <Avatar className="cursor-pointer w-12 h-12">
      <AvatarImage
        src={imageUrl || ""}
        alt="spotify-user-image"
        className="object-cover w-12 h-12 rounded-full"
      />
      <AvatarFallback className="flex items-center justify-center bg-muted text-muted-foreground w-full h-full">
        <UserIconSVG className="w-6 h-6" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserIcon;
