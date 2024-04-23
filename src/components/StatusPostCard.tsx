import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IStatusPost } from '../types/feedTypes';

interface StatusPostCardProps {
  statusPost: IStatusPost;
}

export default function StatusPostCard({ statusPost }: StatusPostCardProps) {
  if (!statusPost) return;
  const { user } = statusPost;
  const { username, email, imgUrl } = user;
  const { statusText } = statusPost;

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {username ? `@${username}` : email}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {statusText}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: '30%' }}
        image={imgUrl}
        alt="user avatar in post"
      />
    </Card>
  );
}
