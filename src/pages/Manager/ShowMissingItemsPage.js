import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TableRowsIcon from '@mui/icons-material/TableRows';
import LogoutIcon from '@mui/icons-material/Logout';
import RuleIcon from '@mui/icons-material/Rule';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

const drawerWidth = 240;

const ShowMissingItemsPage = () => {

  const [itemArray, setItemArray] = useState([]);

  const handleClick = (e) => {
    console.log("----MANGER ID -----")
    var blah = JSON.stringify(localStorage.getItem('managerID'))

    fetch("https://y348qkdqm4.execute-api.us-east-1.amazonaws.com/default/Iteration_3_Manager_Show_Missing_Items", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        managerID: localStorage.getItem('managerID')
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      for (let index in response.Missing_Items){
        let item = response.Missing_Items[index]
        setItemArray(itemArray => (itemArray.concat(item)))
      }
    })
  }

  const navigate = useNavigate()
  const itemsList = [
    { 
        text: 'Process Shipment',
        icon:  <LocalShippingIcon />,
        onClick: () => navigate('/manager/Process_shipment')
    }, 
    {
        text: 'Generate Inventory Report',
        icon: <AssessmentIcon />,
        onClick: () => navigate('/manager/mgir')

    },
    {
        text: 'Generate Overstock Report',
        icon: <SummarizeIcon />,
        onClick: () => navigate('/manager/mgor')
    }, 
    {
        text: 'Fill Shelves',
        icon: <TableRowsIcon />,
        onClick: () => navigate('/manager/fill_shelves')
    },
    {
        text: 'Missing Items',
        icon: <RuleIcon />,
        onClick: () => navigate('/manager/show_missing_items')
    }
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            The Cloud Store
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item 
            return (
              <ListItem button key={text} onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
        </List>
        <Divider />
        <List>
          {['Logout'].map((text, icon, onClick) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => {navigate('/') }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
        <h1> ShowMissingItemsPage</h1>
        </Typography>

        <Button variant='contained' color='success' onClick={handleClick}>Show Mising Items</Button>
        
        <Box sx={{backgroundColor: "F8F8F8"}}>
          {itemArray.map((item) => {
            return <Box sx={{bgcolor: 'fff',
                            boxShadow: 1,
                            borderRadius: 2,
                              p:2,}}
                                >
          <Box> Item Name: {item.itemName}</Box>
          <Box> Item Price: {item.price}</Box>
          <Box> Item QTY: {item.qty}</Box>
        </Box>
      })}          
        </Box>
      </Box>
      
    </Box>
  );
}

export default ShowMissingItemsPage