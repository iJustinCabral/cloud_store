import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, {useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const LoginPage = () => {

    const navigate = useNavigate()

    const [inputs, setInputs] = useState({ 
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleClick = (e) => {
        e.preventDefault()
        console.log(inputs)

        console.log(inputs.username)
        console.log(inputs.password)

        if (inputs.username === "corpo" && inputs.password === "test") {
            navigate('/corporate')
            console.log("did login to corporate")
        }

        if (inputs.username === "manager" && inputs.password === "test") {
            navigate('/manager')
            console.log("did log in to manager")
        }

        //TODO: Send POST using axios with the JSON payload containg username and password

    }

  return (
    <div>
        <form>
            <Box 
                display="flex" 
                flexDirection={'column'} 
                maxWidth={400} 
                alignItems='center' 
                justifyContent={'center'}
                margin='auto'
                marginTop={5}
                padding={3}
                borderRadius={5}
                boxShadow={"5px 5px 10px #ccc"}
                sx={{
                    ":hover": {
                        boxShadow: "10px 10px 10px #ccc"
                    }
                }}
                >
                
                    <Typography variant='h4' padding={5} textAlign='center'> Cloud Store Login </Typography>
                    <TextField name="username" value={inputs.username} onChange={handleChange} margin='normal' variant='outlined' placeholder='Username'/>
                    <TextField name="password" value={inputs.password} onChange={handleChange} margin='normal' type={'password'} variant='outlined' placeholder='Password'/>

                    <Button onClick={handleClick} sx={{marginTop: 3}} variant="contained" color="primary"> Submit </Button>
            </Box>

        </form>
    </div>
  )
}

export default LoginPage