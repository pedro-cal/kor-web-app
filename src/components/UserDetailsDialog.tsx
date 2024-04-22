import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, TextField, Grid, Box } from '@mui/material';
import { IUser } from '../types/userTypes';
import avatarPlaceholder from '../assets/avatar-placeholder.webp';

interface UserDetailsDialogProps {
    open: boolean;
    user: IUser | undefined;
    handleCancel: () => void;
    handleSubmit: (arg0: {id: string, status: string | undefined}) => void;
    isCurrentUser: boolean;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({ open, user, handleCancel, handleSubmit, isCurrentUser }) => {
    const [status, setStatus] = useState<string | undefined>(user?.status);
    useEffect(() => {
        if (user?.status) setStatus(user.status)
    }, [user])

    if (!user) return;

    const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    };

    const isValidStatus = status && status.trim() !== '';

    return (
        <Dialog open={open} onClose={handleCancel} aria-labelledby="user-details-dialog-title" PaperProps={{ style: { width: '600px', height: '400px' } }}>
            <DialogTitle id="user-details-dialog-title">User Details</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Box
                            component="img"
                            sx={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover'
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
                            label="Status"
                            type="text"
                            fullWidth
                            value={status}
                            onChange={handleStatusChange}
                            error={!isValidStatus}
                            helperText={!isValidStatus ? "Status cannot be empty." : ""}
                        />
                        {isCurrentUser ? (
                            <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={1} width={'100%'} marginTop={2}>
                                <Button variant='outlined' onClick={handleCancel}>Cancel</Button>
                                <Button variant='contained' onClick={() => {
                                    handleSubmit({id: user.id, status});
                                    handleCancel();
                                }} disabled={!isValidStatus}>Submit</Button>
                            </Box>
                        ) : (
                            <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={1} width={'100%'} marginTop={2}>
                                <Button variant='outlined' onClick={handleCancel}>Cancel</Button>
                                <Button variant='contained' color='secondary' onClick={() => {}}>Connect</Button>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default UserDetailsDialog;