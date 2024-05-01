import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Fade } from '@mui/material';
import { Link } from 'react-router-dom';

interface MenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

export default function SignedOutMenu({ anchorEl, handleClose }: MenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      <MenuItem onClick={handleClose} component={Link} to="/login">
        Sign In
      </MenuItem>
      <MenuItem onClick={handleClose} component={Link} to="/register">
        Sign Up
      </MenuItem>
    </Menu>
  );
}