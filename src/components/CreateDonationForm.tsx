import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreateDonationForm = () => {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(db, "donations"), {
        foodType,
        quantity,
        expirationDate,
        pickupLocation,
        status: 'available',
        donorId: user.uid,
      });
      // Clear form
      setFoodType('');
      setQuantity('');
      setExpirationDate('');
      setPickupLocation('');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Create a New Donation</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Food Type"
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Expiration Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Pickup Location"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Create Donation
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateDonationForm;
