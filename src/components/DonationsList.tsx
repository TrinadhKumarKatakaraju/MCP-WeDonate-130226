import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { List, ListItem, ListItemText, Button, Paper } from '@mui/material';

const DonationsList = () => {
  const [donations, setDonations] = useState<any[]>([]);

  const fetchDonations = async () => {
    const q = query(collection(db, "donations"), where("status", "==", "available"));
    const querySnapshot = await getDocs(q);
    const donationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDonations(donationsData);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleAccept = async (donationId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const donationRef = doc(db, "donations", donationId);
    await updateDoc(donationRef, {
      status: "accepted",
      acceptedBy: user.uid,
    });

    // Refresh the list of donations
    fetchDonations();
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <List>
        {donations.map(donation => (
          <ListItem key={donation.id} secondaryAction={<Button variant="contained" onClick={() => handleAccept(donation.id)}>Accept</Button>}>
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

export default DonationsList;
