import { Box, IconButton, TextField } from '@mui/material';
import StatusPostCard from '../components/StatusPostCard';
import { IRootState } from '../types/globalTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/system';
import { getCurrentUser } from '../utils/utilFunctions';
import { fetchPosts, submitPost } from '../redux/feedSlice';

const FeedBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  width: '60vw',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
  },
}));

export default function Feed() {
  const dispatch = useDispatch();
  const posts = useSelector((state: IRootState) => state?.feed?.posts);
  const stateUser = useSelector(
    (state: IRootState) => state.global.currentUser
  );
  const currentUser = getCurrentUser(stateUser);

  const [text, setText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchPosts({ id: currentUser?.id }));
  }, []); // eslint-disable-line

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    if (error && event.target.value.trim() !== '') {
      setError(false);
    }
  };

  const handleSubmit = () => {
    if (text.trim() === '') {
      setError(true);
      return;
    }

    dispatch(submitPost({ userId: currentUser?.id, statusText: text }));
    setText('');
  };

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      marginBottom={'24px'}
    >
      <FeedBox>
        <TextField
          label="Post your status"
          variant="outlined"
          value={text}
          onChange={handleChange}
          error={error}
          helperText={error ? 'Status cannot be empty' : ''}
          fullWidth
          style={{ marginRight: 8 }}
        />
        <IconButton
          onClick={handleSubmit}
          color="primary"
          disabled={text.trim() === ''}
        >
          <SendIcon />
        </IconButton>
      </FeedBox>
      <Box display={'flex'} flexDirection={'column'} gap={'24px'}>
        {posts &&
          !!posts.length &&
          posts.map(post => <StatusPostCard key={post.id} statusPost={post} />)}
      </Box>
    </Box>
  );
}
