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
import { Button } from '@mui/material';
import { useState } from 'react';

const drawerWidth = 240;

const ManGORPage = (props) => {

  const[itemArray,setItemArray]=useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const handleClick = (e) => {
    console.log("----MANGER ID -----")
    var blah = JSON.stringify(localStorage.getItem('managerID'))
    console.log(blah)
    //Put New Lambda here
    fetch("https://wwckwvkxc0.execute-api.us-east-1.amazonaws.com/default/manager_generate_overstock_report", {
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
      let sum = 0;
      console.log(response);
      for (let item in response.overstock){
        setItemArray(itemArray => (itemArray.concat(response.overstock[item])))
        sum += response.overstock[item].totalValue
      }
      sum = sum.toFixed(2)
      setTotalValue(sum)
      console.log(itemArray)
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
        <h1> Generate Inventory Report</h1>
        <Box
        sx={{
          backgroundColor: '#F8F8F8'
        }}>
          <List>
          <Box sx={{backgroundColor: "F8F8F8"}}>
          {itemArray.map((item) => {  
            return<Box sx={{
                  bgcolor: '#fff',
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 2,
                }}
              > 
                 <Box>Name: {item.itemName} </Box> 
                 <Box>Price: {item.price}</Box>
                 <Box>QTY: {item.qty} </Box> 
                 <Box>TotalValue: {item.totalValue}</Box>
            </Box>
            })}
            </Box>
          </List>
          
          <div>
          <h2>TotalValue:{totalValue}</h2>
          <Button variant='contained' color='success' onClick={handleClick}> Generate Report </Button>
          </div>
        </Box>

        </Typography>
      </Box>
      
    </Box>
  );
}

export default ManGORPage