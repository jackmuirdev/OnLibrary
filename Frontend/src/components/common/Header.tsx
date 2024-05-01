import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import StoreIcon from '@mui/icons-material/Store';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/configureStore';
import SignedInMenu from '../layout/interface/header-component/SignedInMenu';
import SignedOutMenu from '../layout/interface/header-component/SignedOutMenu';
import { inDevelopment } from '../../util/util';

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { basket } = useAppSelector(state => state.basket);
  const { user } = useAppSelector(state => state.account);
  const itemCount = basket?.items.reduce((sum: any, item: any) => sum + item.quantity, 0);
  const [DropMenuItem, setDropMenuItem] = React.useState<null | HTMLElement>(null);

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setDropMenuItem(event.currentTarget);
  };

  const handleClose = () => {
    setDropMenuItem(null);
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
      <MenuItem onClick={handleMenuClose}>
        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Sign In</Link>
      </MenuItem>
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
        <Link to="/catalogue" style={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton size="small" aria-label="shopping cart" color="inherit">
            <Badge badgeContent={itemCount} color="error">
              <StoreIcon sx={{marginRight: "10px"}} />
              Catalogue
            </Badge>
          </IconButton>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }} onClick={inDevelopment}>
          <IconButton size="small" aria-label="shopping cart" color="inherit">
            <Badge badgeContent={itemCount} color="error">
              <ShoppingCartIcon sx={{marginRight: "10px"}} />
              Shopping Cart
            </Badge>
          </IconButton>
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          <AccountCircle sx={{marginRight: "10px"}} />
          Profile
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src="/brand/logo.png" alt="logo" style={{ width: "100%", height: "50px"}} />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Link to="/catalogue" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton size="small" aria-label="shopping cart" color="inherit" sx={{marginRight: "10px"}}>
                <Badge badgeContent={0} color="error">
                  <StoreIcon />
                </Badge>
              </IconButton>
            </Link>
            <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }} onClick={inDevelopment}>
              <IconButton size="small" aria-label="shopping cart" color="inherit" sx={{marginRight: "10px"}} >
                <Badge badgeContent={0} color="error">
                  <ShoppingCartIcon/>
                </Badge>
              </IconButton>
            </Link>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
        <Box>
          {user ? (
            <SignedInMenu anchorEl={DropMenuItem} handleClose={handleClose} user={user} />
          ) : (
            <SignedOutMenu anchorEl={DropMenuItem} handleClose={handleClose} />
          )}
        </Box>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
