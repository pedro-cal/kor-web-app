import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllUsers,
  requestConnection,
  submitStatus,
} from '../redux/userListSlice';
import { IRootState } from '../types/globalTypes';
import { Box, Button, Typography, styled } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import UserCard from '../components/UserCard';
import { IStatusPayload, IUser } from '../types/userTypes';
import UserDetailsDialog from '../components/UserDetailsDialog';
import { getCurrentUser } from '../utils/utilFunctions';

const CardsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: 22,
  padding: '16px',
  gridTemplateColumns: 'repeat(4, minmax(200px, 1fr))',
  width: '80vw',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
  },
}));

const StatusBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  paddingX: theme.spacing(1),
  gap: theme.spacing(1),
  justifyContent: 'center',
  width: '80vw',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
  },
}));

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const stateUser = useSelector(
    (state: IRootState) => state.global.currentUser
  );
  const friends = useSelector((state: IRootState) => state.userList.friends);
  const currentUser = getCurrentUser(stateUser);
  const { users, isLoading, error } = useSelector(
    (state: IRootState) => state.userList
  );
  const [displayUsers, setDisplayUsers] = useState<IUser[]>(users);
  const [openDetails, setOpenDetails] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>(
    undefined
  );

  useEffect(() => {
    if (showFriends) {
      setDisplayUsers(friends);
    } else {
      setDisplayUsers(users.filter(u => u.id !== currentUser?.id));
    }

    if (!currentUser) setShowFriends(false);
  }, [showFriends, users, friends, currentUser]);

  const isCurrentUser = useMemo(
    () =>
      selectedUser && currentUser
        ? selectedUser?.id === currentUser?.id
        : false,
    [currentUser, selectedUser]
  );

  const handleToggleShowFriends = useCallback(() => {
    setShowFriends(!showFriends);
  }, [showFriends]);

  const handleOpenUserDetails = useCallback((clickedUser: IUser) => {
    setSelectedUser(clickedUser);
    setOpenDetails(true);
  }, []);

  const handleFetchAllUsers = useCallback(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleSubmitStatus = useCallback(
    (payload: IStatusPayload) => {
      dispatch(submitStatus(payload));
    },
    [dispatch]
  );

  const handleRequestConnect = useCallback(
    (inviteeId: string) => {
      dispatch(requestConnection({ inviterId: currentUser?.id, inviteeId }));
    },
    [dispatch, currentUser?.id]
  );

  useEffect(() => {
    handleFetchAllUsers();
  }, []); //eslint-disable-line

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Box
          display="flex"
          width="100%"
          flexDirection="column"
          justifyContent={'center'}
          alignItems={'center'}
        >
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
          {currentUser && (
            <StatusBar
              display={'flex'}
              marginTop={1}
              paddingX={2}
              width={'100%'}
              justifyContent={'center'}
            >
              <Box padding={1}>
                <Typography>Your current status: </Typography>
              </Box>
              <Box
                border={'1px solid'}
                borderRadius={1}
                padding={1}
                flex={'1'}
                textAlign={'center'}
              >
                <Typography>{currentUser.status}</Typography>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  handleOpenUserDetails(currentUser);
                }}
              >
                Update Status
              </Button>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                color="primary"
                onClick={handleToggleShowFriends}
              >
                {showFriends ? 'Show All' : 'Show Friends'}
              </Button>
            </StatusBar>
          )}
          <CardsGrid>
            {(!displayUsers || !displayUsers?.length) && <p>No users found</p>}
            {displayUsers &&
              displayUsers.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  showStatus={showFriends}
                  handleOpenUserDetails={handleOpenUserDetails}
                />
              ))}
          </CardsGrid>
        </Box>
      )}
    </div>
  );
};

export default UserList;
