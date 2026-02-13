import { Stepper, Step, StepLabel, StepContent, Typography, Box } from '@mui/material';
import HowToReg from '@mui/icons-material/HowToReg';
import Notifications from '@mui/icons-material/Notifications';
import PinDrop from '@mui/icons-material/PinDrop';
import PanTool from '@mui/icons-material/PanTool';
import LocalShipping from '@mui/icons-material/LocalShipping';
import FactCheck from '@mui/icons-material/FactCheck';
import Handshake from '@mui/icons-material/Handshake';
import Report from '@mui/icons-material/Report';

const steps = [
    {
        label: 'Register & Get Verified',
        icon: <HowToReg />,
        description: 'Sign up with charity registration number (IPC, UEN). Upload charter documents. Admin verifies.',
    },
    {
        label: 'Set Preferences & Capacity',
        icon: <PinDrop />,
        description: 'Configure accepted categories, max weekly collections, radius, vehicles, operating hours, blackout dates.',
    },
    {
        label: 'Receive Matched Notification',
        icon: <Notifications />,
        description: 'Push/SMS when listing matches preferences and is within inventory-ranked alerts.',
    },
    {
        label: 'Review & Accept or Decline',
        icon: <PanTool />,
        description: 'View full details, photos, distance. First-to-accept model. Decline passes to next NGO.',
    },
    {
        label: 'Coordinate Pickup',
        icon: <LocalShipping />,
        description: 'Confirm pickup time, contact person, access instructions. Confirm time within donor’s pickup window.',
    },
    {
        label: 'Execute Pickup & Confirm',
        icon: <Handshake />,
        description: 'Agent on-site, confirms pickup of collected goods. Confirm in-app. Timestamped record for both parties.',
    },
    {
        label: 'Quality Check (24hr)',
        icon: <FactCheck />,
        description: 'Confirm items match description within 24 hours. Mismatch -> dispute with photo evidence.',
    },
    {
        label: 'Redistribute & Report Impact',
        icon: <Report />,
        description: 'Report back no. of beneficiaries served. Feeds into donor’s impact report.',
    },
];

const NgoJourney = () => {
  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
        <Typography variant="h4" gutterBottom>NGO Recipient Journey</Typography>
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

export default NgoJourney;
