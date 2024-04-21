import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../redux/userListSlice';
import { IRootState } from '../types/globalTypes';

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state: IRootState) => state.userList);

  const handleFetchAllUsers = useCallback(() => {
    dispatch(fetchAllUsers());
  }, [dispatch])

  useEffect(() => {
    // handleFetchAllUsers();
  }, [handleFetchAllUsers]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <button onClick={handleFetchAllUsers}>Fetch All Users</button>
          <ul>
            {users && users.map(user => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default UserList;
