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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';



const drawerWidth = 240;

const FindItemsPage = () => {

  const[isSKUDisabled, setIsSKUDisabled] = useState(false);
  const[isNameDisabled, setisNameDisabled] = useState(false);
  const[isDescDisabled, setisDescDisabled] = useState(false);

  const [storeArray,setStoreArray] = useState([]);
  
  const[formValues, setFormValues] = useState({
    latitude:"",
    longitude:"",
    sku:"",
    name:"",
    description:"",
  })

  const handleChange = (e) => {
    setFormValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  const handleChangeSKU = (e) => {
    // setFormValues((prevState) => ({
    //     ...prevState,
    //     [e.target.name]: e.target.value,
    // }))
    if(e.target.value.length > 0){
      setisNameDisabled(true);
      setisDescDisabled(true);
      setFormValues((prevState) => ({
        ...prevState,
        sku:e.target.value,
        name: null,
        description: null,
      }))
    }
    else{
      setisNameDisabled(false);
      setisDescDisabled(false);
      setFormValues((prevState) => ({
        ...prevState,
        sku: "",
        name: "",
        description: "",
      }))
    }
  }

  const handleChangeName = (e) => {
    if(e.target.value.length > 0){
      setIsSKUDisabled(true);
      setisDescDisabled(true);
      setFormValues((prevState) => ({
        ...prevState,
        sku: null,
        name:e.target.value,
        description: null,
      }))
    }
    else{
      setIsSKUDisabled(false);
      setisDescDisabled(false);
      setFormValues((prevState) => ({
        ...prevState,
        sku: "",
        name: "",
        description: "",
      }))
    }
  }

  const handleChangeDesc = (e) => {
    if(e.target.value.length > 0){
      setIsSKUDisabled(true);
      setisNameDisabled(true);
      setFormValues((prevState) => ({
        ...prevState,
        sku: null,
        name: null,
        description:e.target.value,
      }))
    }
    else{
      setIsSKUDisabled(false);
      setisNameDisabled(false);
      setFormValues((prevState) => ({
        ...prevState,
        sku: "",
        name: "",
        description: "",
      }))
    }
  }

  const handleClick = (e) => {

    fetch("https://pnz1e4zfi6.execute-api.us-east-1.amazonaws.com/default/customer_find_item_in_store", {
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
        longitude:"",
        sku: "",
        name: "",
        description: "",
      }))
      setIsSKUDisabled(false);
      setisNameDisabled(false);
      setisDescDisabled(false);

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
        <h1> Find Items</h1>
        <h2>Use only one field per search</h2>
        </Typography>

        <div>
        <TextField id="latitude-input" name="latitude" label="Latitude" type="text" value={formValues.latitude} onChange={handleChange}/>
        <TextField id="longitude-input" name="longitude" label="Longitude" type="text" value={formValues.longitude} onChange={handleChange}/>
        </div>
        <TextField id="sku-input" name="sku" label="SKU" type="text" value={formValues.sku} onChange={handleChangeSKU} disabled={isSKUDisabled}/>
        <TextField id="name-input" name="name" label="Name" type="text" value={formValues.name} onChange={handleChangeName} disabled={isNameDisabled}/>
        <TextField id="description-input" name="description" label="Description" type="text" value={formValues.description} onChange={handleChangeDesc} disabled={isDescDisabled}/>

        <div>
        <Button variant='contained' color='success' onClick={handleClick}>Search</Button>
        </div>

        <Box sx={{backgroundColor: "F8F8F8"}}>
          {storeArray.map((store) => {
            return <Box sx={{bgcolor: 'fff',
                            boxShadow: 1,
                            borderRadius: 2,
                              p:2,}}
                                >
          <Box>Item: {store.itemName}</Box>
          <Box> Item Description {store.itemDescription}</Box>
          <Box> Store Name: {store.storeName}</Box>
          <Box> Store ID: {store.storeID}</Box>
          <Box> Distance: {store.distance}</Box>
          <Box> Quantity: {store.itemQty}</Box>
        </Box>
      })}
      </Box>  
      </Box>
      
    </Box>
  );
}

export default FindItemsPage;