import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import FavoritesContext from '../../../contexts/FavoritesContext';

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
	Rating,
} from '@mui/material/';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const StyledCard = styled(Card)({
	transition: '0.3s ease-in-out',
	boxShadow:
		'0 0 0 1px rgb(53 72 91 / 7%), 0 2px 2px rgb(0 0 0 / 1%), 0 4px 4px rgb(0 0 0 / 2%), 0 10px 8px rgb(0 0 0 / 3%), 0 15px 15px rgb(0 0 0 / 3%), 0 30px 30px rgb(0 0 0 / 4%), 0 70px 65px rgb(0 0 0 / 5%)',
	'&:hover': {
		boxShadow:
			'0 0 0 1px rgb(53 72 91 / 4%), 0 2px 2px rgb(0 0 0 / 0%), 0 4px 4px rgb(0 0 0 / 1%), 0 10px 8px rgb(0 0 0 / 2%), 0 15px 15px rgb(0 0 0 / 2%), 0 30px 30px rgb(0 0 0 / 2%), 0 70px 65px rgb(0 0 0 / 3%)',
	},
});
const StyledIconButton = styled(IconButton)({
	margin: 0,
	padding: 0,
});
const StyledCardActions = styled(CardActions)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

const PlaceItem = ({ id, image, title, rating, address, description }) => {
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
			});
		}
	};
	const navigate = useNavigate();
	const toggleGoogleMap = () => {
		navigate('/map', {
			state: {
				id: id,
				address: address,
				tittle: title,
			},
		});
	};
	return (
		<Box>
			<StyledCard sx={{ maxWidth: 600, margin: '1rem' }}>
				<CardMedia
					component='img'
					height='240'
					width='auto'
					image={image}
					alt='error'
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant='h5'
						component='div'
						align='center'
					>
						{title}
					</Typography>
					<Typography
						variant='body1'
						color='text.primary'
						gutterBottom
						align='center'
					>
						{description}
					</Typography>
					<Typography
						variant='subtitle2'
						color='text.secondary'
						gutterBottom
						align='center'
						sx={{ fontStyle: 'italic' }}
					>
						{address}
					</Typography>
					<Typography align='center' fontWeight='bold'>
						Rating
					</Typography>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Rating
							name='read-only'
							value={rating}
							readOnly
							precision={0.5}
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						/>
						<Typography sx={{ mx: 1 }}>{`(${rating})`}</Typography>
					</Box>
				</CardContent>
				<StyledCardActions>
					<StyledIconButton
						aria-label='add to favorites'
						onClick={toggleFavoriteStatusHandler}
					>
						{itemIsFavorite ? (
							<Favorite sx={{ color: 'red' }} />
						) : (
							<FavoriteBorder />
						)}
					</StyledIconButton>
					<StyledIconButton
						aira-label='marker on google maps'
						onClick={toggleGoogleMap}
					>
						<Checkbox
							checkedIcon={
								<LocationOnIcon sx={{ color: 'orange' }} />
							}
							icon={<LocationOnOutlinedIcon />}
						/>
					</StyledIconButton>
					<StyledIconButton aria-label='share'>
						<ShareIcon />
					</StyledIconButton>
				</StyledCardActions>
			</StyledCard>
		</Box>
	);
};

export default PlaceItem;
