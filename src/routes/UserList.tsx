import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, requestConnection, submitStatus } from '../redux/userListSlice';
import { IRootState } from '../types/globalTypes';
import { Box, Button, Typography, styled } from '@mui/material';
import UserCard from '../components/UserCard';
import { IStatusPayload, IUser } from '../types/userTypes';
import UserDetailsDialog from '../components/UserDetailsDialog';
import { getCurrentUser } from '../utils/utilFunctions';

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
  const stateUser = useSelector((state: IRootState) => state.global.currentUser);
  const currentUser = getCurrentUser(stateUser);
  const { users, isLoading, error } = useSelector((state: IRootState) => state.userList);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined);

  const isCurrentUser = (selectedUser && currentUser) ? selectedUser.id === currentUser.id : false;

  const handleOpenUserDetails = useCallback((clickedUser: IUser) => {
    setSelectedUser(clickedUser);
    setOpenDetails(true);
  }, [])

  const handleFetchAllUsers = useCallback(() => {
    dispatch(fetchAllUsers());
  }, [dispatch])
  
  const handleSubmitStatus = useCallback((payload: IStatusPayload) => {
    dispatch(submitStatus(payload));
  }, [dispatch])
  
  const handleRequestConnect = useCallback((inviteeId: string) => {
    dispatch(requestConnection({inviterId: currentUser.id, inviteeId}));
  }, [dispatch, currentUser.id])

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
            disableConnect={!!currentUser}
            handleCancel={() => {
              setOpenDetails(false);
              setSelectedUser(undefined);
            }}
            isCurrentUser={isCurrentUser}
            handleSubmitStatus={handleSubmitStatus}
            handleRequestConnect={handleRequestConnect}
          />
          {currentUser &&
          <Box display={'flex'} marginTop={1} paddingX={2} width={'100%'} justifyContent={'center'}>
            <Box marginRight={1} padding={1}>
              <Typography>Your current status: </Typography>
            </Box>
            <Box border={'1px solid'} borderRadius={1} marginRight={1} padding={1} flex={'1'} textAlign={'center'}>
              <Typography>{currentUser.status}</Typography>
            </Box>
            <Button variant='contained' color='secondary' onClick={() => {handleOpenUserDetails(currentUser)}}>Update Status</Button>
          </Box>}
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
