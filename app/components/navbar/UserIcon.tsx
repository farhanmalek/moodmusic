import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { User } from '../../utils/context/store'


const UserIcon = ({ user }: {user: User}) => {
  return (
    <Avatar>
        <AvatarImage src={user.spotifyImageUrl} alt='spotify-user-image' className='object-cover'/>
        <AvatarFallback>Hello! {user.username}</AvatarFallback>
    </Avatar>
  );
};

export default UserIcon;
