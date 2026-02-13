import { Container, Typography, Box } from '@mui/material';
import DonationsList from '../components/DonationsList';
import AcceptedDonations from '../components/AcceptedDonations';

const NgoDashboard = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        NGO Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to your dashboard. Here you can view and accept available food donations.
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 4 }}>
        <div>
          <Typography variant="h6">Available Donations</Typography>
          <DonationsList />
        </div>
        <AcceptedDonations />
      </Box>
    </Container>
  );
};

export default NgoDashboard;
