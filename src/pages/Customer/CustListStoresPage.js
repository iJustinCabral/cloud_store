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

const CustListStoresPage = () => {

  const [storeArray,setStoreArray] = useState([]);

  const[formValues, setFormValues] = useState({
    latitude:"",
    longitude:""
  })

  const handleChange = (e) => {
    setFormValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  const handleClick = (e) => {
    console.log(formValues)

    fetch("https://c9atyzlbgl.execute-api.us-east-1.amazonaws.com/default/customer_list_stores", {
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
      console.log(JSON.stringify(formValues))
      setFormValues(() => ({
        latitude:"",
        longitude:""
      }))
      for (let index in response.Stores){
        let store = response.Stores[index]
        setStoreArray(storeArray => (storeArray.concat(store)))
      }

      console.log(storeArray)
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
        <h1> Customer List Stores </h1>
        </Typography>

        <TextField id="latitude-input" name="latitude" label="Latitude" type="text" value={formValues.latitude} onChange={handleChange}/>
        <TextField id="longitude-input" name="longitude" label="Longitude" type="text" value={formValues.longitude} onChange={handleChange}/>

        <Button variant="contained" color='success' onClick={handleClick}>search</Button>

        <Box sx={{backgroundColor: "F8F8F8"}}>
          {storeArray.map((store) => {
            return <Box sx={{bgcolor: 'fff',
                            boxShadow: 1,
                            borderRadius: 2,
                              p:2,}}
                                >
          <Box> Store Name: {store.storeName}</Box>
          <Box> Store ID: {store.storeID}</Box>
          <Box> Distance: {store.distance}</Box>
        </Box>
      })}          
        </Box>

      </Box>
      
    </Box>
  );
}

export default CustListStoresPage;