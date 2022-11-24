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
import ListIcon from '@mui/icons-material/List';
import BlindsClosedIcon from '@mui/icons-material/BlindsClosed';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Button, TextField } from '@mui/material';


const drawerWidth = 240;

const CustItemsOnASPage = () => {

  const[formValues, setFormValues] = useState({
    storeID: "",
    aisle: "",
    shelf: ""
  })

  const handleChange = (e) => {
    setFormValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  const handleClick = (e) => {

    fetch("https://ypjlzzj4l7.execute-api.us-east-1.amazonaws.com/default/customer_list_items_on_aisle_shelf_in_store", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setFormValues(() => ({
        storeID: "",
        aisle: "",
        shelf: "",
      }))
    })
  }


  const navigate = useNavigate()
  const itemsList = [
    {
      text: ' Item on Aisle/Shelf in Store',
      icon: <BlindsClosedIcon />,
      onClick: () => navigate('/customer/items_on_shelves')

    },
    {
      text: 'List Stores',
      icon: <ListIcon />,
      onClick: () => navigate('/customer/cust_list_stores')
    }, 
    {
      text: 'Find Item in Store',
      icon: <ManageSearchIcon/>,
      onClick: () => navigate('/customer/find_items')
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
        <h1>List Items on Aisle Shelf in Store </h1>
        </Typography>

        <TextField id="store-input" name="storeID" label="Store ID" type="text" value={formValues.storeID} onChange={handleChange}/>
        <TextField id="aisle-input" name="aisle" label="Aisle Number" type="text" value={formValues.aisle} onChange={handleChange}/>
        <TextField id="shelf-input" name="shelf" label="Shelf Number" type="text" value={formValues.shelf} onChange={handleChange}/>

        <div>
        <Button variant='contained' color='success' onClick={handleClick}>Submit</Button>
        </div>

      </Box>
      
    </Box>
  );
}

export default CustItemsOnASPage;