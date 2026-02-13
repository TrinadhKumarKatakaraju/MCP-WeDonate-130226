import { Container, Typography, Box } from '@mui/material';
import CreateDonationForm from '../components/CreateDonationForm';
import MyDonations from '../components/MyDonations';

const DonorDashboard = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Donor Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to your dashboard. Here you can create and manage your food donations.
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 4 }}>
        <CreateDonationForm />
        <MyDonations />
      </Box>
    </Container>
  );
};

export default DonorDashboard;
