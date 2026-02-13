import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

interface Donation {
  id: string;
  foodType: string;
  quantity: string;
  expirationDate: string;
  pickupLocation: string;
  status?: string;
  acceptedBy?: string;
  donorId?: string;
}

const AcceptedDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const fetchDonations = async () => {
      const q = query(collection(db, "donations"), where("acceptedBy", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const donationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donation));
      setDonations(donationsData);
    };

    fetchDonations();
  }, [user]);

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6">My Accepted Donations</Typography>
      <List>
        {donations.map(donation => (
          <ListItem key={donation.id}>
            <ListItemText 
              primary={donation.foodType} 
              secondary={`Quantity: ${donation.quantity} - Expires: ${donation.expirationDate} - Pickup: ${donation.pickupLocation}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AcceptedDonations;
