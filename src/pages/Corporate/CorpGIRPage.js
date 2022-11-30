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

const CorpGIRPage = () => {

  const[itemArray,setItemArray]=useState([]);
  const [formValues, setFormValues] = useState({
    storeID: ""
  })
  const [totalValue, setTotalValue] = useState(0)

  const handleChange = (e) => {
    setFormValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }


  const handleClick = (e) => {
    fetch("https://38ncxacpui.execute-api.us-east-1.amazonaws.com/default/corporate_generate_store_inventory_report", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      let totalPrice = 0
      for (let item in response.inventory){
        setItemArray(itemArray => (itemArray.concat(response.inventory[item])))
        console.log(response.inventory[item].totalValue)
        totalPrice += response.inventory[item].totalValue
      }
      //console.log(totalPrice)
      setTotalValue(totalPrice)
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
        <h1> Generate Inventory Report</h1>
        <TextField id="storeID-input" name="storeID" label="Store ID" type="text" value={formValues.storeID} onChange={handleChange}/>
        <div>
        <Button variant='contained' color='success' onClick={handleClick}> Submit </Button>
        </div>
        </Typography>

        <Box
        sx={{
          backgroundColor: '#F8F8F8'
        }}>
          <List>
            <Box
                sx={{
                  bgcolor: '#fff',
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 2, 
                }}
              >
              {itemArray.map((item) => {  
                return <div>{item.itemName} {item.price} {item.qty} {item.totalValue}</div>
              })}
            </Box>
          </List>
          </Box>
        <h1>Total Price: {totalValue}</h1>
      </Box>
      
    </Box>
  );
}

export default CorpGIRPage