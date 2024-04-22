import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Switch, FormControlLabel, FormGroup } from '@mui/material';

interface LoginDialogProps {
    open: boolean;
    handleClose: () => void;
    onSubmit?: (payload: { username?: string; email?: string; imgUrl?: string }) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, handleClose, onSubmit }) => {
   const [inputValue, setInputValue] = useState('');
   const [isUsername, setIsUsername] = useState(true); // True for username, false for email

   const handleToggle = () => {
       setIsUsername(!isUsername);
       setInputValue(''); // Reset input when toggle changes
   };

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       setInputValue(event.target.value);
   };

   const handleSubmit = () => {
       // Implement submit logic here
       const payload = { [isUsername ? 'username' : 'email']: inputValue };
       if (onSubmit) onSubmit(payload);
       handleClose();
   };

   const handleCancel = () => {
       setInputValue('');
       handleClose();
   };

   const validateInput = () => {
       if (isUsername) {
           return /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/.test(inputValue); // Username regex
       } else {
           return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputValue); // Email regex
       }
   };

   return (
       <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title" PaperProps={{ style: { width: '400px', height: '300px' } }}>
           <DialogTitle id="form-dialog-title">Enter your username or email to join</DialogTitle>
           <DialogContent
                sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
           >
               <FormGroup sx={{ width: '100%'}}>
                   <FormControlLabel
                       control={<Switch checked={!isUsername} onChange={handleToggle} />}
                       label={isUsername ? "Switch to Email" : "Switch to Username"}
                   />
                   <TextField
                       autoFocus
                       margin="dense"
                       id="name"
                       label={isUsername ? "Username" : "Email"}
                       type="text"
                       fullWidth
                       value={inputValue}
                       onChange={handleChange}
                       error={!validateInput() && inputValue.length > 0}
                       helperText={isUsername ? "Enter a valid username (min 5 chars, only letters, numbers, underscores)" : "Enter a valid email address"}
                       required
                    />
               </FormGroup>
           </DialogContent>
           <DialogActions>
               <Button onClick={handleCancel} color="primary">
                   Cancel
               </Button>
               <Button onClick={handleSubmit} color="primary" disabled={!validateInput()}>
                   Submit
               </Button>
           </DialogActions>
       </Dialog>
   );
};

export default LoginDialog;
