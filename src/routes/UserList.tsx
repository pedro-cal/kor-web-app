import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../redux/userListSlice';
import { IRootState } from '../types/globalTypes';
import { Box, styled } from '@mui/material';
import UserCard from '../components/UserCard';
import { IUser } from '../types/userTypes';
import UserDetailsDialog from '../components/UserDetailsDialog';

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
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined);

  const handleOpenUserDetails = useCallback((clickedUser: IUser) => {
    setSelectedUser(clickedUser);
    setOpenDetails(true);
  }, [])

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
          <UserDetailsDialog
            open={openDetails}
            user={selectedUser}
            handleCancel={() => {
              setOpenDetails(false);
              setSelectedUser(undefined);
            }}
            handleSubmit={() => {}}
          />
          <CardsGrid>
            {(!users || !users?.length) && <p>No users found</p>}
            {users && users.map((user) => (
              <UserCard user={user} handleOpenUserDetails={handleOpenUserDetails}/>
            ))}
          </CardsGrid>
        </Box>
      )}
    </div>
  );
};

export default UserList;
