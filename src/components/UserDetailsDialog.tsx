import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Box,
} from '@mui/material';
import { IRespondRequestPayload, IUser } from '../types/userTypes';
import avatarPlaceholder from '../assets/avatar-placeholder.webp';

interface UserDetailsDialogProps {
  open: boolean;
  user: IUser | undefined;
  handleCancel: () => void;
  handleSubmitStatus: (arg0: {
    id: string;
    status: string | undefined;
  }) => void;
  handleRequestConnect: (inviteeId: string) => void;
  handleRespondRequest: (
    arg0: Pick<IRespondRequestPayload, 'inviterId' | 'status'>
  ) => void;
  isCurrentUser: boolean;
  disableConnect: boolean;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({
  open,
  user,
  handleCancel,
  handleRequestConnect,
  handleSubmitStatus,
  handleRespondRequest,
  isCurrentUser,
  disableConnect,
}) => {
  const [status, setStatus] = useState<string | undefined>(user?.status);
  const isValidStatus = status && status.trim() !== '';
  useEffect(() => {
    if (user?.status) setStatus(user.status);
  }, [user]);

  if (!user) return;
  const { isInviter, friendStatus } = user;

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="user-details-dialog-title"
      PaperProps={{ style: { width: '600px', height: '400px' } }}
    >
      <DialogTitle id="user-details-dialog-title">User Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              component="img"
              sx={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }}
              alt="User Image"
              src={user.imgUrl || avatarPlaceholder}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              value={user.username}
              disabled
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={user.email}
              disabled
            />
            <TextField
              margin="dense"
              label="Tagline"
              type="text"
              fullWidth
              disabled={!isCurrentUser}
              value={status}
              onChange={handleStatusChange}
              error={!isValidStatus}
              helperText={!isValidStatus ? 'Status cannot be empty.' : ''}
            />
            {isCurrentUser ? (
              <Box
                display={'grid'}
                gridTemplateColumns={'1fr 1fr'}
                gap={1}
                width={'100%'}
                marginTop={2}
              >
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleSubmitStatus({ id: user.id, status });
                    handleCancel();
                  }}
                  disabled={!isValidStatus}
                >
                  Submit
                </Button>
              </Box>
            ) : (
              <Box
                display={'grid'}
                gridTemplateColumns={'1fr 1fr'}
                gap={1}
                width={'100%'}
                marginTop={2}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (isInviter) {
                      handleRespondRequest({
                        inviterId: user.id,
                        status: 'rejected',
                      });
                    } else {
                      handleCancel();
                    }
                  }}
                >
                  {isInviter ? 'Reject' : 'Close'}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={!disableConnect || (!isInviter && !!friendStatus)}
                  onClick={() => {
                    if (isInviter) {
                      handleRespondRequest({
                        inviterId: user.id,
                        status: 'accepted',
                      });
                    } else {
                      handleRequestConnect(user.id);
                    }
                    handleCancel();
                  }}
                >
                  {isInviter ? 'Accept' : 'Connect'}
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
