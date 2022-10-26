import React from 'react'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

<Button component={Link} to="/about" variant="contained" color="primary">
  About Page
</Button>
const home = () => {
  return (
    <div>
        <Button component={Link} to="/corporate" variant="contained" color="primary">
            Corporate User
        </Button>

        <Button component={Link} to="/manager" variant="contained" color="primary">
            Manager User
        </Button>

    </div>
  )
}

export default home