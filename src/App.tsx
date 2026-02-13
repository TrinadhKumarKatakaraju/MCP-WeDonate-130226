import { AppBar, Toolbar, Typography, Button, Container, Box, Paper, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Grid from '@mui/material/Grid';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import DonorJourney from './pages/DonorJourney';
import NgoJourney from './pages/NgoJourney';
import Register from './pages/Register';
import Login from './pages/Login';
import DonorDashboard from './pages/DonorDashboard';
import NgoDashboard from './pages/NgoDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Analytics } from './components/Analytics';

const Home = () => (
  <Box>
    <Paper 
      elevation={3} 
      sx={{ 
        padding: 4, 
        margin: 4, 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Connecting Surplus to Scarcity
      </Typography>
      <Typography variant="h5" component="p" gutterBottom align="center">
        Our platform bridges the gap between corporate donors with surplus food and NGOs who can distribute it to those in need.
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 4 }}>
        <Grid item xs={12} sm={6} md={4} sx={{textAlign: 'center'}}>
          <Button component={Link} to="/donor" variant="contained" color="primary" size="large">
            I'm a Donor
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{textAlign: 'center'}}>
          <Button component={Link} to="/ngo" variant="outlined" color="primary" size="large">
            I'm an NGO
          </Button>
        </Grid>
      </Grid>
    </Paper>
  </Box>
);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
        } else {
          console.log("No such document!");
        }
      } else {
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Analytics />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="home"
              component={Link}
              to="/"
              sx={{ mr: 2, color: 'white' }}
          >
              <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Food Donation Platform
            </Link>
          </Typography>
          {user && userRole === 'donor' && (
            <Button color="inherit" component={Link} to="/donor-dashboard" sx={{ color: 'white' }}>Dashboard</Button>
          )}
          {user && userRole === 'ngo' && (
            <Button color="inherit" component={Link} to="/ngo-dashboard" sx={{ color: 'white' }}>Dashboard</Button>
          )}
          <Button color="inherit" component={Link} to="/donor" sx={{ color: 'white' }}>Donor</Button>
          <Button color="inherit" component={Link} to="/ngo" sx={{ color: 'white' }}>NGO</Button>
          {user ? (
            <>
              <Typography variant="body1" sx={{ color: 'white', marginRight: 2 }}>
                {user.email}
              </Typography>
              <Button color="inherit" onClick={handleLogout} sx={{ color: 'white' }}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ color: 'white' }}>Login</Button>
              <Button color="inherit" component={Link} to="/register" sx={{ color: 'white' }}>Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{flexGrow: 1}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donor" element={<DonorJourney />} />
          <Route path="/ngo" element={<NgoJourney />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donor-dashboard" element={<ProtectedRoute user={user} userRole={userRole} requiredRole='donor'><DonorDashboard /></ProtectedRoute>} />
          <Route path="/ngo-dashboard" element={<ProtectedRoute user={user} userRole={userRole} requiredRole='ngo'><NgoDashboard /></ProtectedRoute>} />
        </Routes>
      </Container>
      <Box sx={{
          textAlign: 'center',
          padding: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white'
      }}>
          <Typography variant="body2">&copy; {new Date().getFullYear()} Food Donation Platform. All Rights Reserved.</Typography>
      </Box>
    </div>
  );
}

export default App;
