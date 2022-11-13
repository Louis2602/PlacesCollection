import { useContext } from 'react';
import { useNavigate } from 'react-router';

import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Checkbox,
    Box,
    styled,
    Rating
} from '@mui/material/';
import { Share, FavoriteBorder, Favorite, LocationOn, LocationOnOutlined, Delete } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

import FavoritesContext from '../../../contexts/FavoritesContext';

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
    const favoriteCtx = useContext(FavoritesContext);

    const itemIsFavorite = favoriteCtx.itemIsFavorite(id);

    const toggleFavoriteStatusHandler = () => {
        if (itemIsFavorite) {
            favoriteCtx.removeFavorite(id);
        } else {
            favoriteCtx.addFavorite({
                id: id,
                title: title,
                rating: rating,
                description: description,
                image: image,
                address: address,
                type: type
            });
        }
    };
    const navigate = useNavigate();
    const toggleGoogleMap = () => {
        navigate('/map', {
            state: {
                id: id,
                address: address,
                tittle: title
            }
        });
    };
    const classes = useStyles();

    const handleDelete = ({ id, type }) => {
        fetch(`https://food-collections-test-default-rtdb.firebaseio.com/places/${type}s/${id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            window.location.reload(false);
        });
    };

    return (
        <StyledCard className={classes.root}>
            <StyledCardContent className={classes.root}>
                <StyledCardMedia className={classes.root} component="img" image={image} alt="error" />
                <StyledTypoBox>
                    <Typography className={classes.root} variant="body1" color="text.primary" gutterBottom>
                        {description}
                    </Typography>
                    <Typography
                        className={classes.root}
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                        sx={{ fontStyle: 'italic' }}>
                        {address}
                    </Typography>
                    <Typography className={classes.root} align="center" fontWeight="bold">
                        Rating
                    </Typography>
                    <Box className={classes.root}>
                        <Rating name="read-only" value={rating} readOnly precision={0.5} />
                        <Typography sx={{ mx: 1 }}>{`(${rating})`}</Typography>
                    </Box>
                    <CardActions className={classes.root}>
                        <StyledIconButton aria-label="add to favorites" onClick={toggleFavoriteStatusHandler}>
                            {itemIsFavorite ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
                        </StyledIconButton>
                        <StyledIconButton aira-label="marker on google maps" onClick={toggleGoogleMap}>
                            <Checkbox
                                sx={{ padding: 0 }}
                                checkedIcon={<LocationOn sx={{ color: 'orange' }} />}
                                icon={<LocationOnOutlined />}
                            />
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
