import { Stepper, Step, StepLabel, StepContent, Typography, Box } from '@mui/material';
import Assignment from '@mui/icons-material/Assignment';
import Business from '@mui/icons-material/Business';
import Create from '@mui/icons-material/Create';
import DateRange from '@mui/icons-material/DateRange';
import Done from '@mui/icons-material/Done';
import ThumbUp from '@mui/icons-material/ThumbUp';
import LocalShipping from '@mui/icons-material/LocalShipping';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Receipt from '@mui/icons-material/Receipt';
import Assessment from '@mui/icons-material/Assessment';
import Warning from '@mui/icons-material/Warning';
import HourglassEmpty from '@mui/icons-material/HourglassEmpty';
import Edit from '@mui/icons-material/Edit';

const steps = [
  {
    label: 'Register & Verify Business',
    icon: <Business />,
    description: 'Upload supporting documents. Admin reviews and approves.',
  },
  {
    label: 'Set Up Company Profile & Locations',
    icon: <Assignment />,
    description: 'Configure default pickup address(es), operating hours, contact person, and preferred donation items.',
  },
  {
    label: 'Create Surplus Listing',
    icon: <Create />,
    description: 'Enter item type, quantity, expiry date, photo upload, storage condition, pickup window.',
  },
  {
    label: 'Listing Estimation Tool (Optional)',
    icon: <DateRange />,
    description: 'For event-based surplus, enter planned pax and actual attendance. Auto-calculates estimated surplus.',
  },
  {
    label: 'Save Draft or Publish',
    icon: <Done />,
    description: 'Save incomplete listings as Draft or Publish. Published active listing triggers geo-matched NGO notifications.',
  },
  {
    label: 'Decision: NGO Response',
    icon: <HourglassEmpty />,
    description: 'Accepted -> Continue to Step 6. No NGO accepts -> Listing auto-expires. Donor can extend window, widen radius, or close. Edit needed -> Modify while Active (before acceptance).',
  },
  {
    label: 'NGO Accepts -> Listing Locked',
    icon: <ThumbUp />,
    description: 'Listing details are locked for the NGO that accepted. See NGO name, rating, estimated pickup time.',
  },
  {
    label: 'Mark Items "Ready for Donation"',
    icon: <Edit />,
    description: 'Confirm items in the listing are "ready-in-app". Updated photo optional. Triggers "ready" notification to NGO.',
  },
  {
    label: 'Pickup Coordination',
    icon: <LocalShipping />,
    description: 'Directions and ETA visible to both parties. In-app messaging for logistics questions. Status -> Pickup Scheduled.',
  },
  {
    label: 'Pickup Confirmed',
    icon: <CheckCircle />,
    description: 'NGO agent confirms receipt at location. Both parties get notification. Status -> Picked Up.',
  },
  {
    label: 'Post-Pickup Quality Check',
    icon: <Receipt />,
    description: 'NGO has 24 hours to confirm items match listing. Mismatch -> dispute raised.',
  },
  {
    label: 'Donation Receipt Generated',
    icon: <Receipt />,
    description: 'Auto-generated PDF. Items, quantity, estimated value, impact scores, NGO recipient, date.',
  },
  {
    label: 'Impact Dashboard Updated',
    icon: <Assessment />,
    description: 'Cumulative ESG metrics update. Feeds into on-demand or quarterly CSR summary.',
  },
  {
    label: 'Exception: NGO No-Show',
    icon: <Warning />,
    description: 'Donor report no-show -> Listing re-activates -> Offered to next-nearest NGOs. No-show NGO receives strike (3 strikes = suspension).',
  },
];

const DonorJourney = () => {
  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
        <Typography variant="h4" gutterBottom>Corporate Donor Journey</Typography>
        <Stepper orientation="vertical">
        {steps.map((step, index) => (
            <Step key={index} active>
            <StepLabel
                icon={step.icon}
            >
                <Typography variant="h6">{step.label}</Typography>
            </StepLabel>
            <StepContent>
                <Typography>{step.description}</Typography>
            </StepContent>
            </Step>
        ))}
        </Stepper>
    </Box>
  );
};

export default DonorJourney;
