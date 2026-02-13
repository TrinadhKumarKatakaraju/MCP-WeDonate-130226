import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { List, ListItem, ListItemText, Button, Paper } from '@mui/material';

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

const DonationsList = () => {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const q = query(collection(db, "donations"), where("status", "==", "available"));
      const querySnapshot = await getDocs(q);
      const donationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donation));
      setDonations(donationsData);
    };
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
    const q = query(collection(db, "donations"), where("status", "==", "available"));
    const querySnapshot = await getDocs(q);
    const donationsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donation));
    setDonations(donationsData);
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
