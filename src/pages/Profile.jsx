import { styled, Card, Avatar, Box, TextField, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material/';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Avatar as AvatarImg } from '../components/Carousel/assets';

const StyledCard = styled(Card)(({ theme }) => ({
    width: '48rem',
    height: '24rem',
    display: 'flex',
    paddingRight: '4rem',
    transition: '0.3s ease-in-out',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        width: '100%',
        height: '33rem',
        padding: 0
    }
}));

const StyledBox = styled(Box)(({ theme }) => ({
    width: '30vw',
    padding: '4rem 0',
    [theme.breakpoints.down('md')]: {
        marginTop: '1rem',
        width: '100%',
        padding: 0
    }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: '220px',
    height: '220px',
    display: 'flex',
    margin: '1rem auto',
    [theme.breakpoints.down('md')]: {
        marginTop: '1rem',
        width: '200px',
        height: '200px'
    }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: '0.5rem',
    [theme.breakpoints.down('md')]: {
        '& .MuiInputBase-readOnly': {
            textAlign: 'center'
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
        margin: '0 22px',
        textAlign: 'center'
    }
}));

const UserFormControl = ({ gender, data }) => <FormControlLabel disabled={data !== gender} checked={data === gender} label={gender} control={<Radio />} />;

const UserTextField = ({ label, value }) => (
    <StyledTextField
        label={label}
        value={value ? value : ''}
        variant="standard"
        fullWidth
        InputLabelProps={{
            shrink: true
        }}
        InputProps={{
            readOnly: true
        }}
    />
);

const Profile = () => {
    const [loadedItems, setloadedItems] = useState({});
    const username = useSelector((state) => state.counter.username);
    useEffect(() => {
        if (username) {
            fetch(`https://food-collections-test-default-rtdb.firebaseio.com/accounts/${username}.json`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setloadedItems(data);
                });
        }
    }, [username]);
    return (
        <>
            <h1>Profile</h1>
            <StyledCard>
                <StyledBox>
                    <StyledAvatar alt="Avatar" src={AvatarImg} />
                </StyledBox>
                <StyledBox>
                    <StyledFormLabel>Gender</StyledFormLabel>
                    <StyledRadioGroup row>
                        <UserFormControl gender="Male" data={loadedItems.gender} />
                        <UserFormControl gender="Female" data={loadedItems.gender} />
                        <UserFormControl gender="Other" data={loadedItems.gender} />
                    </StyledRadioGroup>
                    <StyledUserBox>
                        <UserTextField label="Username" value={loadedItems.username} />
                        <UserTextField label="Birthday" value={loadedItems.birthday} />
                        <UserTextField label="Email" value={loadedItems.email} />
                    </StyledUserBox>
                </StyledBox>
            </StyledCard>
        </>
    );
};

export default Profile;
