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
import { autocompleteClasses, Button, TextField } from '@mui/material';
import { useState } from 'react';

const drawerWidth = 240;

const ProcessShipmentPage = (props) => {

  const [formValues, setFormValues] = useState({
    items:""
  })

  const handleChange = (e) => {
    setFormValues((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  
  const handleClick = (e) => {
    fetch("https://mzpfsxsqx2.execute-api.us-east-1.amazonaws.com/default/process_shipment_lambda", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //body: JSON.stringify(payload),
      body: (`{"managerID": "` + localStorage.getItem('managerID') + `", "items":` + formValues.items+`}` )
    })
    .then(response => response.json())
    .then(response => {
      console.log((`{"managerID": "` + localStorage.getItem('managerID') + `", "items":` + formValues.items+`}` ))
      console.log(response)
      setFormValues(() => ({
        items:"",
      }))
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
        <h1> Proccess Shipment</h1>        
        <div>
          <TextField id="items-input" name="items" label="items" type="text"  value={formValues.items} onChange={handleChange } inputProps={{
            sx:{
              width:500,
              height:500
            }
          }}/>
          <div>
            <Button variant='contained' color='success' onClick={handleClick}> Process Shipment </Button>
          </div>
          <h2 style={{ color: 'red' } }> We Expect the Following format</h2>
          <h2 style={{ color: 'red' } }>Example 1:  [
              {`{"sku": "DRJ297831", "qty": "20"},`}
              {`{"sku": "JK199283", "qty": "3"}`}
                                                      ]
          </h2>
            <h2 style={{ color: 'red' } }>
              Example 2: [
                {`{"sku": "JK199283", "qty": "5"}`}
              ]
            </h2>
            <h2 style={{ color: 'red' } }>
              Example 3: [
                {`{"sku": "222", "qty": "5"}`}
              ]
            </h2>
        </div>
        </Typography>
      </Box>
      
    </Box>
  );
}

export default ProcessShipmentPage