import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { styled, Card, Avatar, Box, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, Dialog, Button, DialogTitle } from '@mui/material/';
import { onValue, ref, update } from 'firebase/database';
import AvatarEdit from 'react-avatar-edit';

import { db } from '../firebase/firebaseConfig';

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
        height: '34rem',
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

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        padding: '1rem',
        paddingTop: 0
    }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: '220px',
    height: '220px',
    display: 'flex',
    margin: '0 auto',
    objectFit: 'cover',
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

const StyledAvatarBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '0.5rem'
});

const StyledDialogTitle = styled(DialogTitle)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

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
    const { enqueueSnackbar } = useSnackbar();

    const [imageCrop, setImageCrop] = useState(false);
    const [dialogs, setDialogs] = useState(false);

    const username = useSelector((state) => state.counter.username);
    const mode = useSelector((state) => state.theme.value);

    const [data, setData] = useState({});

    useEffect(() => {
        const dataRef = ref(db, `/accounts/${username}`);
        return onValue(dataRef, (dbData) => {
            const loadedData = dbData.val();
            setData(loadedData);
        });
    });

    const onCrop = (view) => {
        setImageCrop(view);
    };
    const onClose = () => {
        setImageCrop(false);
    };

    const saveImage = async () => {
        const updates = {
            [`/accounts/${username}/avatar`]: imageCrop
        };
        await update(ref(db), updates);
        enqueueSnackbar('Upload image success!', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        });
        setDialogs(false);
    };

    const onBeforeFileLoad = (elem) => {
        if (elem.target.files[0].size > 50000000) {
            alert('File is too big!');
            elem.target.value = '';
        }
    };

    const handleCloseDialog = () => {
        setDialogs(false);
        setImageCrop(false);
    };

    return (
        <section>
            <h1>Profile</h1>
            <StyledCard>
                <StyledBox>
                    <StyledAvatar alt="Avatar" src={data.avatar ? data.avatar : null} />
                    <StyledAvatarBox>
                        <Button onClick={() => setDialogs(true)}>Upload Image</Button>
                    </StyledAvatarBox>

                    <StyledDialog disableScrollLock={true} open={dialogs} onClose={handleCloseDialog}>
                        <StyledDialogTitle>Change Avatar</StyledDialogTitle>
                        <AvatarEdit
                            labelStyle={{ color: mode ? 'var(--white--color)' : 'var(--black--color)', fontSize: '20px', fontWeight: '500' }}
                            width={280}
                            height={280}
                            textAlign="center"
                            onClose={onClose}
                            onCrop={onCrop}
                            onBeforeFileLoad={onBeforeFileLoad}
                        />
                        <Box sx={{ paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                            <Button sx={{ width: '8rem' }} onClick={handleCloseDialog} variant="contained">
                                Cancel
                            </Button>
                            <Button sx={{ width: '8rem' }} onClick={saveImage} disabled={!imageCrop} variant="contained">
                                Save
                            </Button>
                        </Box>
                    </StyledDialog>
                </StyledBox>

                <StyledBox>
                    <StyledFormLabel>Gender</StyledFormLabel>
                    <StyledRadioGroup row>
                        <UserFormControl gender="Male" data={data.gender} />
                        <UserFormControl gender="Female" data={data.gender} />
                        <UserFormControl gender="Other" data={data.gender} />
                    </StyledRadioGroup>
                    <StyledUserBox>
                        <UserTextField label="Username" value={data.username} />
                        <UserTextField label="Birthday" value={data.birthday} />
                        <UserTextField label="Email" value={data.email} />
                    </StyledUserBox>
                </StyledBox>
            </StyledCard>
        </section>
    );
};

export default Profile;
