import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../../../../models/user';
import { signOut } from '../../../../slices/accountSlice';
import { clearBasket } from '../../../../slices/basketSlice';
import { useAppDispatch } from '../../../../store/configureStore';

interface MenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  user: User;
}

export default function SignedInMenu({ anchorEl: anchorElProp, handleClose: handleCloseProp, user }: MenuProps) {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    handleCloseProp();
  };

  return (
    <>
      {anchorElProp || anchorEl ? (
        <Menu
          anchorEl={anchorElProp || anchorEl}
          open={Boolean(anchorElProp) || open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose} component={Link} to="/orders">
            My Orders
          </MenuItem>
          {user?.roles?.includes('Admin') ? (
          <MenuItem onClick={handleClose} component={Link} to="/inventory">
            Inventory
          </MenuItem>
          ) : null}
          <MenuItem onClick={() => {
            dispatch(signOut());
            dispatch(clearBasket());
            handleClose();
          }}>
            Logout
          </MenuItem>
        </Menu>
      ) : null}
    </>
  );
}