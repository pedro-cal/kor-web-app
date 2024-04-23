import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import LoginDialog from './LoginDialog';
import { IRootState } from '../types/globalTypes';
import { signUser, clearCurrentUser } from '../redux/globalSlice';
import { getCurrentUser } from '../utils/utilFunctions';
import { IUser } from '../types/userTypes';

export default function Header() {
  const dispatch = useDispatch();
  const stateUser = useSelector(
    (state: IRootState) => state.global.currentUser
  );
  const friends = useSelector((state: IRootState) => state.userList.friends);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = React.useState<IUser>();
  const [notifications, setNotifications] = React.useState<IUser[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    setCurrentUser(getCurrentUser(stateUser));
  }, [stateUser]);

  useEffect(() => {
    const notifications = friends
      ? friends.filter(f => !!f.isInviter && f.friendStatus === 'pending')
      : [];
    setNotifications(notifications);
  }, [friends]);

  const handleDispatchSignUser = (payload: {
    username?: string;
    email?: string;
    imgUrl?: string;
  }) => {
    dispatch(signUser(payload));
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={notifications?.length || null} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Button color="inherit">Login</Button>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <LoginDialog
          open={isOpen}
          handleClose={() => setIsOpen(false)}
          onSubmit={handleDispatchSignUser}
        />

        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '32px' }}
          >
            Supah Friends
          </Typography>

          <Button
            color="inherit"
            component={NavLink}
            to="/"
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Users
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/friends"
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Friends
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/feed"
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            Feed
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show new notifications"
              color="inherit"
              onClick={() => navigate('/friends')}
            >
              <Badge badgeContent={notifications?.length || null} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {currentUser && currentUser.imgUrl ? (
                <Box
                  borderRadius={'50%'}
                  width={30}
                  height={30}
                  overflow={'hidden'}
                  border={'1px solid white'}
                >
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    alt="profile avatar"
                    src={currentUser.imgUrl}
                  />
                </Box>
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            {currentUser ? (
              <Button
                color="inherit"
                sx={{ paddingLeft: 4 }}
                onClick={() => {
                  dispatch(clearCurrentUser());
                  localStorage.removeItem('currentUser');
                }}
              >
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Typography sx={{ fontSize: '8px' }}>
                    {currentUser.username}
                  </Typography>
                  LOG OUT
                </Box>
              </Button>
            ) : (
              <Button
                color="inherit"
                sx={{ paddingLeft: 4 }}
                onClick={() => setIsOpen(true)}
              >
                LOGIN
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
