import { Container, Typography, TextField, Button, Box, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Paper } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [userType, setUserType] = useState('donor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType((event.target as HTMLInputElement).value);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Add a new document in collection "users"
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: userType,
      });

      navigate('/'); // Redirect to home on successful registration
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }}>
          <FormLabel component="legend">I am a...</FormLabel>
          <RadioGroup row aria-label="userType" name="userType" value={userType} onChange={handleUserTypeChange}>
            <FormControlLabel value="donor" control={<Radio />} label="Donor" />
            <FormControlLabel value="ngo" control={<Radio />} label="NGO" />
          </RadioGroup>
        </FormControl>
        <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Typography variant="body2" align="center">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
