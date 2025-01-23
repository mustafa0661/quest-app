import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const userId = 5; // Örnek kullanıcı ID'si

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div">
                <Box
                  component={Link}
                  to="/"
                  sx={{
                    textDecoration: 'none',
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': {
                      color: 'lightblue',
                    },
                  }}
                >
                  Home
                </Box>
              </Typography>
            </Box>
            <Box
              component={Link}
              to={`/users/${userId}`}
              sx={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  color: 'lightblue',
                },
              }}
            >
              User Profile
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;