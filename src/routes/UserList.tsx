import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../redux/userListSlice';
import { IRootState } from '../types/globalTypes';
import { Box, styled } from '@mui/material';
import UserCard from '../components/UserCard';

const CardsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: 22,
  padding: '16px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  width: '80vw',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
  }
})); 

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state: IRootState) => state.userList);

  const handleFetchAllUsers = useCallback(() => {
    dispatch(fetchAllUsers());
  }, [dispatch])

  useEffect(() => {
    handleFetchAllUsers();
  }, [handleFetchAllUsers]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Box display='flex' width='100%' flexDirection='column' justifyContent={'center'} alignItems={'center'}>
          <CardsGrid>
            {(!users || !users?.length) && <p>No users found</p>}
            {users && users.map((user) => (
              <UserCard user={user}/>
            ))}
          </CardsGrid>
        </Box>
      )}
    </div>
  );
};

export default UserList;
