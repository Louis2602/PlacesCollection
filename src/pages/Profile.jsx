import { styled, Card, Avatar, Box, TextField, RadioGroup, FormControlLabel, Radio, FormLabel, Dialog, Button, DialogTitle } from '@mui/material/';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import AvatarEdit from 'react-avatar-edit';
import { Close, Done } from '@mui/icons-material';

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
    const [loadedItems, setloadedItems] = useState({});
    const [imageCrop, setImageCrop] = useState(false);
    const [dialogs, setDialogs] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const username = useSelector((state) => state.counter.username);

    const fetchData = () => {
        if (username) {
            fetch(`https://food-collections-test-default-rtdb.firebaseio.com/accounts/${username}.json`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setloadedItems(data);
                });
        }
    };

    const onCrop = (view) => {
        setImageCrop(view);
    };
    const onClose = () => {
        setImageCrop(false);
    };

    const saveImage = () => {
        fetch(`https://food-collections-test-default-rtdb.firebaseio.com/accounts/${username}.json`, {
            method: 'PUT',
            body: JSON.stringify({ ...loadedItems, avatar: `${imageCrop}` }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            window.location.reload(false);
            enqueueSnackbar('Upload image success!', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
            setIsLoading(false);
        });
        setDialogs(false);
        setIsLoading(true);
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

    fetchData();

    return (
        <>
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <>
                    <h1>Profile</h1>
                    <StyledCard>
                        <StyledBox>
                            <StyledAvatar alt="Avatar" src={loadedItems.avatar ? loadedItems.avatar : null} />
                            <StyledAvatarBox>
                                <Button onClick={() => setDialogs(true)}>Upload Image</Button>
                            </StyledAvatarBox>

                            <StyledDialog open={dialogs} onClose={handleCloseDialog}>
                                <StyledDialogTitle>Change Avatar</StyledDialogTitle>
                                <AvatarEdit
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
            )}
        </>
    );
};

export default Profile;
