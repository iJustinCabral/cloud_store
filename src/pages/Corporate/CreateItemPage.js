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
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

const drawerWidth = 240;

const CreateItemPage = (props) => {

  const [formValues, setFormValues] = useState({
    sku: "",
    name: "",
    description: "",
    price: "",
    shelfMaxQty: ""
  })

  const handleChange = (e) => {
    setFormValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  const handleClick = (e) => {
    fetch("https://0kh4satg9k.execute-api.us-east-1.amazonaws.com/default/create_item_lamda", {
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
        sku: "",
        name: "",
        description: "",
        price: "",
        shelfMaxQty: ""
      }))
    })
  }

  const navigate = useNavigate()

  const itemsList = [
    { 
      text: 'Create Item',
      icon:  <AddCircleIcon />,
      onClick: () => navigate('/corporate/create_item_page')
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
        display={"grid"}
        flexDirection={'column'}
        sx={{flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
        <h1> Create Item</h1>
        <TextField id="sku-input" name="sku" label="SKU" type="text" value={formValues.sku} onChange={handleChange}/>
        <TextField id="name-input" name="name" label="Name" type="text" value={formValues.name} onChange={handleChange}/>
        <TextField id="description-input" name="description" label="Description" type="text" value={formValues.description} onChange={handleChange}/>
        <TextField id="price-input" name="price" label="Price" type="text" value={formValues.price} onChange={handleChange}/>
        <TextField id="shelfMaxQty-input" name="shelfMaxQty" label="Max Quantity" type="text" value={formValues.shelfMaxQty} onChange={handleChange}/>

        <div>
        <Button variant='contained' color='success' onClick={handleClick}> Submit </Button>
        </div>

        </Typography>
      </Box>
      
    </Box>
  );
}

export default CreateItemPage