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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';


const drawerWidth = 240;
let value = 0.0;

const CorpGTIRPage = () => {

  const[itemArray,setItemArray]=useState([]);

  const handleClick = (e) => {
    fetch("https://st0t54rdql.execute-api.us-east-1.amazonaws.com/default/Iteration_3_Corporate_Generate_Total_Stores_Inventory_Report", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: ''
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      for (let item in response.storesInventory){
        setItemArray(itemArray => (itemArray.concat(response.storesInventory[item])))
      }
      console.log(itemArray)
    })
  }

  const navigate = useNavigate()
  const itemsList = [
    { 
      text: 'Create Item',
      icon:  <AddCircleIcon />,
      onClick: () => navigate('/corporate/create_item')
    }, 
    {
      text: 'List Stores',
      icon: <ListAltIcon />,
      onClick: () => navigate('/corporate/list_stores')

    },
    {
      text: 'Assign Item Location',
      icon: <AddLocationAltIcon />,
      onClick: () => navigate('/corporate/assign_item_location')
    }, 
    {
      text: 'Create Store',
      icon: <AddBusinessIcon />,
      onClick: () => navigate('/corporate/create_store')
    },
    {
      text: 'Remove Store',
      icon: <DeleteForeverIcon />,
      onClick: () => navigate('/corporate/remove_store')
    },
    {
      text: 'Generate Total Invetory Report',
      icon: <SummarizeIcon />,
      onClick: () => navigate('/corporate/gtir')
    },
    {
      text: 'Generate Inventory Report',
      icon: <AssessmentIcon />,
      onClick: () => navigate('/corporate/gir')
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
        <h1> Generate Total Inventory Report</h1>
        <div>
        <Button variant='contained' color='success' onClick={handleClick}> Generate Report </Button>
        </div>
        </Typography>

        <Box
        sx={{
          backgroundColor: '#F8F8F8'
        }}>
          <List>
              {itemArray.map((item) => {  
                value += item.totalValue
                return <Box sx={{ bgcolor: '#fff',boxShadow: 1,borderRadius: 2,p: 2, padding: '10px'}}>
                  <Box><b>Item Name: </b>{item.itemName}</Box>
                  <Box><b>Item Price: </b>{item.price}</Box>
                  <Box><b>Item Quantity: </b>{item.qty}</Box>
                  <Box><b>Item Total Value in Stock: </b>${item.totalValue}</Box>
                </Box>
              })}
          </List>
          </Box>

          <h1>Total Inventory Value: ${value}</h1>
      </Box>
    </Box>
  );
}

export default CorpGTIRPage