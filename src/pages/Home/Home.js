import React from 'react'
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const home = () => {
    localStorage.setItem("managerID", "0")
    console.log(localStorage.getItem("managerID")
    )
  return (
    <div>
        <h1> Welcome To The Cloud Store </h1>
        <h4> Select your role below: </h4>
        <Stack direction="row" spacing={2}>
          
            <Button component={Link} to="/login" variant="contained" color="primary">
                Corporate or Manager
            </Button>

            <Button component={Link} to="/customer" variant="contained" color="primary" disabled>
                Customer
            </Button>
        </Stack>

    </div>
  )
}

export default home