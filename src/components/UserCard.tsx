import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IUser } from '../types/userTypes';
import avatarPlaceholder from '../assets/avatar-placeholder.webp';
import { theme } from '../theme/theme';

interface IUserCardProps {
  user: IUser;
}

export default function UserCard({ user }: IUserCardProps) {
  if (!user) return;
  const { id, username, email, status, imgUrl } = user;
  return (
    <Card key={id} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={imgUrl || avatarPlaceholder}
          alt="user avatar"
          sx={{ backgroundColor: theme.palette.background.default }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {username}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {status}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
