import { styled, Card, Avatar, Typography, Box, TextField, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material/';
import { useDispatch } from 'react-redux';

import { Avatar as AvatarImg } from '../components/Carousel/assets';

const data = {
    id: 1,
    name: 'PoTayTo',
    gender: 'Male',
    dateOfBirth: '11/07/2003',
    email: 'tdakhoa21@clc.fitus.edu.vn',
    createdOn: '12/11/2022'
};
const StyledCard = styled(Card)(({ theme }) => ({
    width: '50vw',
    height: '50vh',
    margin: '1rem',
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    transition: '0.3s ease-in-out',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('md')]: {
        margin: 0,
        flexDirection: 'column',
        width: '100%',
        height: 'auto'
    }
}));
const StyledBox = styled(Box)(({ theme }) => ({
    width: '30vw',
    [theme.breakpoints.down('md')]: {
        marginTop: '1rem',
        width: '100%'
    }
}));
const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: '220px',
    height: '220px',
    display: 'flex',
    margin: '1.5rem auto',
    [theme.breakpoints.down('md')]: {
        marginTop: '1rem',
        width: '200px',
        height: '200px'
    }
}));
const StyledTypo = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: '1rem',
    [theme.breakpoints.down('md')]: {
        marginBottom: '1rem'
    }
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '20vw',
    marginBottom: '1rem',
    [theme.breakpoints.down('md')]: {
        width: '280px',
        input: { textAlign: 'center' },
        '& .MuiInputLabel-root': {
            textAlign: 'center'
        },
        '& .MuiInputLabel-shrink': {
            margin: '0 auto',
            position: 'absolute',
            right: '-20px',
            left: '0',
            width: '100px'
        }
    }
}));
const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
    fontSize: '0.8rem',
    [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'center'
    }
}));
const StyledRadioGroup = styled(RadioGroup)(({ theme }) => ({
    marginBottom: '4px',
    [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '16px'
    }
}));
const StyledUserBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        margin: '0 22px'
    }
}));

const UserFormControl = ({ gender, data }) => <FormControlLabel disabled={data !== gender} value={gender} label={gender} control={<Radio />} />;

const UserTextField = ({ label, value }) => (
    <StyledTextField
        variant="standard"
        label={label}
        defaultValue={value}
        InputProps={{
            readOnly: true
        }}
    />
);

const Profile = () => {
    const dispatch = useDispatch();
    
    return (
        <>
            <h1>Profile</h1>
            <StyledCard>
                <StyledBox>
                    <StyledAvatar alt="Avatar" src={AvatarImg} />
                    <StyledTypo variant="h5" color="text.primary" gutterBottom>
                        {data.name}
                    </StyledTypo>
                </StyledBox>
                <StyledBox>
                    <StyledFormLabel>Gender</StyledFormLabel>
                    <StyledRadioGroup defaultValue={data.gender} row>
                        <UserFormControl gender="Male" data={data.gender} />
                        <UserFormControl gender="Female" data={data.gender} />
                        <UserFormControl gender="Other" data={data.gender} />
                    </StyledRadioGroup>
                    <StyledUserBox>
                        <UserTextField label="Date Of Birth" value={data.dateOfBirth} />
                        <UserTextField label="Email" value={data.email} />
                        <UserTextField label="Password" value={data.createdOn} />
                    </StyledUserBox>
                </StyledBox>
            </StyledCard>
        </>
    );
};

export default Profile;
