import { useEffect, useState } from 'react';
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
	Rating,
} from '@mui/material/';
import {
	Share,
	FavoriteBorder,
	Favorite,
	LocationOn,
	LocationOnOutlined,
	Delete,
} from '@mui/icons-material';
import { remove, ref, update } from 'firebase/database';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { db } from '../../../firebase/firebaseConfig';
import { useGetFavoritesQuery } from '../../../redux/services/fetchAPI';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
	width: 380,
	height: 540,
	margin: '1rem',
	alignItems: 'center',
	justifyContent: 'center',
	transition: '0.3s ease-in-out',
	borderRadius: '20px',
	boxShadow:
		'0 0 0 1px rgb(53 72 91 / 7%), 0 2px 2px rgb(0 0 0 / 1%), 0 4px 4px rgb(0 0 0 / 2%), 0 10px 8px rgb(0 0 0 / 3%), 0 15px 15px rgb(0 0 0 / 3%), 0 30px 30px rgb(0 0 0 / 4%), 0 70px 65px rgb(0 0 0 / 5%)',
	'&:hover': {
		boxShadow:
			'0 0 0 1px rgb(53 72 91 / 4%), 0 2px 2px rgb(0 0 0 / 0%), 0 4px 4px rgb(0 0 0 / 1%), 0 10px 8px rgb(0 0 0 / 2%), 0 15px 15px rgb(0 0 0 / 2%), 0 30px 30px rgb(0 0 0 / 2%), 0 70px 65px rgb(0 0 0 / 3%)',
	},
	[theme.breakpoints.down('md')]: {
		width: 310,
	},
}));
const StyledIconButton = styled(IconButton)({
	padding: 2,
});
const StyledCardActions = styled(CardActions)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});
const StyledBox = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});
const StyledRating = styled(Rating)({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});
const StyledLink = styled(Link)(({ theme }) => ({
	color: theme.palette.mode === 'dark' ? 'white' : 'black',
}));
const StyledCardMedia = styled(CardMedia)({
	transition: '250ms all ease-in-out',
	'&:hover': {
		transform: 'scale(1.05)',
		transition: '250ms all ease-in-out',
	},
});
const PlaceItem = ({
	id,
	image,
	title,
	rating,
	address,
	description,
	type,
}) => {
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const username = useSelector((state) => state.counter.username);
	const { data, isFetching } = useGetFavoritesQuery(username);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (data && data[id]) setIsFavorite(true);
	}, [data, id]);

	const toggleGoogleMap = () => {
		navigate('/map', {
			state: {
				id: id,
				address: address,
				tittle: title,
			},
		});
	};

	const handleDelete = async ({ id, type }) => {
		await remove(ref(db, `/places/${type}s/${id}`));
		navigate(`/${type}s`);
	};

	const handleFavorite = ({ id, username }) => {
		if (username) {
			if (isFavorite) {
				remove(ref(db, `/accounts/${username}/favorites/${id}`));
				setIsFavorite(false);
			} else {
				const updates = {
					[`/accounts/${username}/favorites/${id}`]: true,
				};
				update(ref(db), updates);
				setIsFavorite(true);
			}
		} else {
			enqueueSnackbar('Sign in to access!', {
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
			navigate('/sign-in');
		}
	};

	if (isFetching) return <div className='loader' />;

	return (
		<StyledCard>
			<StyledLink to={`/${type}s/${id}`}>
				<StyledCardMedia
					component='img'
					height='240'
					width='auto'
					image={image}
					alt='error'
				/>
				<CardContent>
					<Typography
						noWrap
						gutterBottom
						variant='h5'
						component='div'
						align='center'
					>
						{title}
					</Typography>
					<Typography
						noWrap
						variant='body1'
						color='text.primary'
						gutterBottom
						align='center'
					>
						{description}
					</Typography>
					<Typography
						noWrap
						variant='subtitle2'
						color='text.secondary'
						gutterBottom
						align='center'
						sx={{ fontStyle: 'italic' }}
					>
						{address}
					</Typography>
					<Typography align='center' fontWeight='bold' gutterBottom>
						Rating
					</Typography>
					<StyledBox>
						<StyledRating
							name='read-only'
							value={rating}
							readOnly
							precision={0.5}
						/>
						<Typography sx={{ mx: 1 }}>{`(${rating})`}</Typography>
					</StyledBox>
				</CardContent>
			</StyledLink>
			<StyledCardActions>
				<StyledIconButton
					aria-label='add to favorites'
					onClick={() => handleFavorite({ id, username })}
				>
					{isFavorite ? (
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
						sx={{ padding: 0 }}
						checkedIcon={<LocationOn sx={{ color: 'orange' }} />}
						icon={<LocationOnOutlined />}
					/>
				</StyledIconButton>
				<StyledIconButton aria-label='share'>
					<Share />
				</StyledIconButton>
				<StyledIconButton
					aria-label='delete'
					onClick={() => handleDelete({ id, type })}
				>
					<Delete />
				</StyledIconButton>
			</StyledCardActions>
		</StyledCard>
	);
};

export default PlaceItem;
