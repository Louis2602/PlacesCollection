import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
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

import FavoritesContext from '../../../contexts/FavoritesContext';

const StyledCard = styled(Card)(({ theme }) => ({
    width: 380,
    height: 540,
    margin: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.3s ease-in-out',
    boxShadow:
        '0 0 0 1px rgb(53 72 91 / 7%), 0 2px 2px rgb(0 0 0 / 1%), 0 4px 4px rgb(0 0 0 / 2%), 0 10px 8px rgb(0 0 0 / 3%), 0 15px 15px rgb(0 0 0 / 3%), 0 30px 30px rgb(0 0 0 / 4%), 0 70px 65px rgb(0 0 0 / 5%)',
    '&:hover': {
        boxShadow:
            '0 0 0 1px rgb(53 72 91 / 4%), 0 2px 2px rgb(0 0 0 / 0%), 0 4px 4px rgb(0 0 0 / 1%), 0 10px 8px rgb(0 0 0 / 2%), 0 15px 15px rgb(0 0 0 / 2%), 0 30px 30px rgb(0 0 0 / 2%), 0 70px 65px rgb(0 0 0 / 3%)'
    },
    [theme.breakpoints.down('md')]: {
        width: 310
    }
}));
const StyledIconButton = styled(IconButton)({
    padding: 2
});
const StyledCardActions = styled(CardActions)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});
const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});
const StyledRating = styled(Rating)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});
const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? 'white' : 'black'
}));

const PlaceItem = ({ id, image, title, rating, address, description, type }) => {
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
        <StyledCard>
            <StyledLink to={`/${type}s/${id}`}>
                <CardMedia component="img" height="240" width="auto" image={image} alt="error" />
                <CardContent>
                    <Typography noWrap gutterBottom variant="h5" component="div" align="center">
                        {title}
                    </Typography>
                    <Typography noWrap variant="body1" color="text.primary" gutterBottom align="center">
                        {description}
                    </Typography>
                    <Typography
                        noWrap
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                        align="center"
                        sx={{ fontStyle: 'italic' }}>
                        {address}
                    </Typography>

                    <Typography align="center" fontWeight="bold">
                        Rating
                    </Typography>
                    <StyledBox>
                        <StyledRating name="read-only" value={rating} readOnly precision={0.5} />
                        <Typography sx={{ mx: 1 }}>{`(${rating})`}</Typography>
                    </StyledBox>
                </CardContent>
            </StyledLink>
            <StyledCardActions>
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
            </StyledCardActions>
        </StyledCard>
    );
};

export default PlaceItem;
