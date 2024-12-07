import React, { useState } from 'react';
import { Button, TextField, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { register, AddedUserRole } from '../Api';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    maxWidth: 400,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginTop: "7vw",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Register = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const classes = useStyles();
  const [form, setForm] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const userInfo = {
        userId: form.userId,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };  
      await dispatch(register(userInfo));
      await dispatch(AddedUserRole(form.userId, 2));
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data); 
      } else {
          setSnackbarMessage('Registration failed');
      }
    }
  };

  return (
    <div  className='registerDiv'>
      <Paper className={classes.paper} >
        <Typography variant="h5">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User ID"
            name="userId"
            value={form.userId}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{background:"#14144F", color:"white"}}
            className={classes.button}
          >
            Register
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
