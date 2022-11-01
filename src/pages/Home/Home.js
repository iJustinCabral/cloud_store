import React from 'react'
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const home = () => {
  return (
    <div>
        <h1> Welcome To The Cloud Store </h1>
        <h4> Select your role below: </h4>
        <Stack direction="row" spacing={2}>
            <Button onClick={() => {
                fetch("https://0kh4satg9k.execute-api.us-east-1.amazonaws.com/default/create_item_lamda", {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ sku : "1239", name : "TestName", description : "Descr", price : 1, shelfMaxQty : 5}                    )
                  })
                  .then(response => response.json())
                  .then(response => {
                    console.log(response)
                  })
            }} variant="contained" color="primary">
                Test API Gateway
            </Button>
            <Button component={Link} to="/login" variant="contained" color="primary">
                Corporate
            </Button>

            <Button component={Link} to="/login" variant="contained" color="secondary">
                Manager
            </Button>

            <Button component={Link} to="/customer" variant="contained" color="primary" disabled>
                Customer
            </Button>
        </Stack>

    </div>
  )
}

export default home