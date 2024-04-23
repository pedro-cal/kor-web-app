import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Chip } from '@mui/material';
import { IUser } from '../types/userTypes';
import avatarPlaceholder from '../assets/avatar-placeholder.webp';
import { theme } from '../theme/theme';

interface IUserCardProps {
  user: IUser | undefined;
  handleOpenUserDetails: (clickedUser: IUser) => void;
  showStatus: boolean;
}

export default function UserCard({
  user,
  handleOpenUserDetails,
  showStatus,
}: IUserCardProps) {
  if (!user) return;
  const { id, username, email, status, imgUrl, friendStatus, isInviter } = user;

  return (
    <Card
      key={id}
      sx={{ maxWidth: 345 }}
      onClick={() => handleOpenUserDetails(user)}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={imgUrl || avatarPlaceholder}
          alt="user avatar"
          sx={{ backgroundColor: theme.palette.background.default }}
        />
        <CardContent>
          {showStatus && (
            <Box display={'flex'} width={'100%'} marginBottom={1}>
              <Chip
                label={
                  friendStatus === 'pending' && isInviter
                    ? 'requested'
                    : friendStatus
                }
                color="primary"
                variant="outlined"
                size="small"
              />
            </Box>
          )}
          <Typography gutterBottom variant="h5" component="div">
            {username ? `@${username}` : email}
          </Typography>
          <Typography gutterBottom component="div">
            {username && email ? email : '-'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {status}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
