import React, { memo } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { styles } from './header.style';
import { useThemeContext } from '../../contexts/theme/hooks/useThemeContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { toggleTheme, mode } = useThemeContext();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <LocalAtmIcon fontSize="large" />
        </Link>

        <Box sx={styles.navItems}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Typography variant="body2" component="div" sx={styles.navItemText}>
              produtos
            </Typography>
          </Link>
          <Link to="/coupons" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Typography variant="body2" component="div" sx={styles.navItemText}>
              cupons
            </Typography>
          </Link>
        </Box>

        <Box sx={styles.actionIcons}>
          <IconButton color="inherit" onClick={handleCartClick}>
            <ShoppingCartIcon />
          </IconButton>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);