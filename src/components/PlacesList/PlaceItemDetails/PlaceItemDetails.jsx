import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, Checkbox, Box, styled, Rating } from '@mui/material/';
import { Share, FavoriteBorder, Favorite, LocationOn, LocationOnOutlined, Delete } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { remove, ref, update, onValue } from 'firebase/database';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { db } from '../../../firebase/firebaseConfig';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
}));

const StyledCard = styled(Card)(({ theme }) => ({
    minWidth: '90vw',
    width: 'auto',
    minHeight: '70vh',
    margin: '1rem',
    padding: '0 10px',
    transition: '0.3s ease-in-out',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));
const StyledIconButton = styled(IconButton)({
    padding: 2
});

const StyledCardMedia = styled(CardMedia)({
    minWidth: '45vw',
    minHeight: '60vh'
});
const StyledTypoBox = styled(Box)(({ theme }) => ({
    paddingLeft: '20px',
    minWidth: '40vw',
    [theme.breakpoints.down('md')]: {
        marginTop: '1rem'
    }
}));
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column'
    }
}));

const PlaceItemDetails = ({ id, image, title, rating, address, description, type }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const username = useSelector((state) => state.counter.username);

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const dataRef = ref(db, `/accounts/${username}/favorites/${id}`);
        return onValue(dataRef, (dbData) => {
            const loadedData = dbData.val();
            setIsFavorite(loadedData);
        });
    });

    const toggleGoogleMap = () => {
        navigate('/map', {
            state: {
                id: id,
                address: address,
                title: title
            }
        });
    };

    const handleDelete = async ({ id, type }) => {
        await remove(ref(db, `/places/${type}s/${id}`));
        navigate(`/${type}s`);
    };

    const handleFavorite = ({ id, username, title }) => {
        if (username) {
            if (isFavorite) {
                remove(ref(db, `/accounts/${username}/favorites/${id}`));
                setIsFavorite(false);
            } else {
                const updates = {
                    [`/accounts/${username}/favorites/${id}`]: title
                };
                update(ref(db), updates);
                setIsFavorite(true);
            }
        } else {
            enqueueSnackbar('Sign in to access!', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
            navigate('/sign-in');
        }
    };

    return (
        <StyledCard className={classes.root}>
            <StyledCardContent className={classes.root}>
                <StyledCardMedia className={classes.root} component="img" image={image} alt="error" />
                <StyledTypoBox>
                    <Typography variant="body1" color="text.primary" gutterBottom>
                        {description}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontStyle: 'italic' }}>
                        {address}
                    </Typography>
                    <Typography align="center" fontWeight="bold">
                        Rating
                    </Typography>
                    <Box className={classes.root}>
                        <Rating name="read-only" value={rating || 0} readOnly precision={0.5} />
                        <Typography sx={{ mx: 1 }}>{`(${rating})`}</Typography>
                    </Box>
                    <CardActions className={classes.root}>
                        <StyledIconButton aria-label="add to favorites" onClick={() => handleFavorite({ id, username, title })}>
                            {isFavorite ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
                        </StyledIconButton>
                        <StyledIconButton aira-label="marker on google maps" onClick={toggleGoogleMap}>
                            <Checkbox sx={{ padding: 0 }} checkedIcon={<LocationOn sx={{ color: 'orange' }} />} icon={<LocationOnOutlined />} />
                        </StyledIconButton>
                        <StyledIconButton aria-label="share">
                            <Share />
                        </StyledIconButton>
                        <StyledIconButton aria-label="delete" onClick={() => handleDelete({ id, type })}>
                            <Delete />
                        </StyledIconButton>
                    </CardActions>
                </StyledTypoBox>
            </StyledCardContent>
        </StyledCard>
    );
};

export default PlaceItemDetails;
