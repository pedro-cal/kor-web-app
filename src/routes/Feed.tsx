import { Box, IconButton, TextField } from '@mui/material';
import StatusPostCard from '../components/StatusPostCard';
import { IRootState } from '../types/globalTypes';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/system';

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
  const posts = useSelector((state: IRootState) => state?.feed?.posts);

  const [text, setText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    // Reset error state on text change
    if (error && event.target.value.trim() !== '') {
      setError(false);
    }
  };

  const handleSubmit = () => {
    // Check if the text is not just empty spaces
    if (text.trim() === '') {
      setError(true);
      return;
    }

    console.log('Posting status:', text); // Replace with actual post logic
    setText(''); // Clear text field after posting
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
          posts.map(post => <StatusPostCard statusPost={post} />)}
      </Box>
    </Box>
  );
}
