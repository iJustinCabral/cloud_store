import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, {useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import FormControl from '@mui/material'
import FormLabel from '@mui/material'
import Radio from '@mui/material'
import RadioGroup from '@mui/material'
import FormControlLabel from '@mui/material'

const LoginPage = () => {


    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        whoAmI: "", 
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

        fetch("https://dz897xj14m.execute-api.us-east-1.amazonaws.com/default/login_lambda", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
          })
          .then(response => response.json())
          .then(response => {

            console.log(response.message)
            console.log(response)

            if (inputs.whoAmI == "corporate" && response.message == "successful login") {
                navigate('/corporate')
                console.log("did login to corporate")
            }
    
            if (inputs.whoAmI == "manager" && response.message == "successful login") {
                localStorage.setItem('managerID', response.managerID)
                navigate('/manager')
                console.log("did log in to manager")
                console.log(localStorage.getItem('managerID'))

            }

            setInputs(() => ({
                username: "",
                password: ""
            }))
          })

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
 
                    <legend>Who are you?</legend>
                    <div>
                        <input type="radio" id="choice1" name="whoAmI" value="corporate" onChange={handleChange}/>
                        <label for="choice1">Corporate</label>

                        <input type="radio" id="choice2" name="whoAmI" value="manager" onChange={handleChange}/>
                        <label for="choice2">Manager</label>
                    </div>
                
                    <TextField name="username" value={inputs.username} onChange={handleChange} margin='normal' variant='outlined' placeholder='Username'/>
                    <TextField name="password" value={inputs.password} onChange={handleChange} margin='normal' type={'password'} variant='outlined' placeholder='Password'/>

                    <Button onClick={handleClick} sx={{marginTop: 3}} variant="contained" color="primary"> Submit </Button>
            </Box>

        </form>
    </div>
  )
}

export default LoginPage