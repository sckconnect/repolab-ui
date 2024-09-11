// src/components/Home/Home.jsx
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { Assessment, AddBox, Report, Visibility, MedicalServices } from '@mui/icons-material';
import Button from '@mui/material/Button';

const drawerWidth = 240;

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const menuItems = [
    { text: 'Create Master Test Configuration', icon: <AddBox />, path: '/home/create-test' },
    { text: 'Create Sub Test', icon: <AddBox />, path: '/home/create-subtest' },
    { text: 'Create Report', icon: <Assessment />, path: '/home/create-patient-report' }
   // { text: 'View Report', icon: <Visibility />, path: '/view-report' },
    //{ text: 'Create Doctor', icon: <MedicalServices />, path: '/create-doctor' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 , textAlign : 'center'}}>
            Medical Report App
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
          
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Home;
