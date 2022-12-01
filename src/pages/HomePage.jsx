import { Box, Grid, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import home from '../assets/home.png';

// import Carousel from '../components/Carousel/Carousel';

const StyledLink = styled(Link)({
	color: 'inherit',
	textDecoration: 'none',
});
const StyledTypography = styled(Typography)({
	transition: '400ms all ease-in-out',
	backgroundColor: 'inherit',
	color: 'inherit',
	width: 'fit-content',
	padding: '1rem 2rem',
	fontWeight: 'bold',
	border: '4px solid',
	borderImage:
		'linear-gradient(101deg, var(--pink--color), var(--orange--color)) 1',
	cursor: 'pointer',
	boxSizing: 'border-box',
	'&:hover': {
		backgroundColor: 'inherit',
		color: 'var(--main--color)',
		padding: '1rem 3rem',
	},
});
const StyledBox = styled(Box)({
	marginTop: '6rem',
	padding: '4rem',
});
const StyledTypoQuote = styled(Typography)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		display: 'block',
		fontSize: '2rem',
	},
}));
const Ellipse = styled('div')({
	zIndex: '-1',
	position: 'absolute',
	top: '10%',
	right: '35%',
	filter: 'blur(100px)',
});
const Orange = styled('div')({
	height: '15rem',
	width: '15rem',
	backgroundColor: 'var(--orange--color)',
});
const Pink = styled('div')({
	height: '15rem',
	width: '15rem',
	backgroundColor: 'var(--pink--color)',
});
const ImgContainer = styled(Grid)({
	textAlign: 'center',
	position: 'relative',
	zIndex: '10',
});
const HomePage = () => {
	return (
		<StyledBox>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Box>
						<Typography
							sx={{
								color: 'var(--pink--color)',
								fontSize: '2rem',
							}}
						>
							DSC TEAM
						</Typography>
						<StyledTypoQuote
							variant='h1'
							textAlign='start'
							fontWeight='bold'
							gutterBottom
						>
							A Places Collection for everyone
						</StyledTypoQuote>
						<Typography sx={{ display: 'block' }} mb='1rem'>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Repudiandae autem, natus illo in iure sequi
							laboriosam velit perferendis vitae? Nulla.
						</Typography>
						<StyledTypography>
							<StyledLink to={'/sign-up'}>Sign Up</StyledLink>
						</StyledTypography>
					</Box>
				</Grid>
				<ImgContainer
					item
					xs={12}
					md={6}
					sx={{
						display: { xs: 'none', md: 'block' },
					}}
				>
					<Box>
						<img src={home} alt='home-img' />
					</Box>
					<Ellipse>
						<Pink>Blur</Pink>
						<Orange>Blur</Orange>
					</Ellipse>
				</ImgContainer>
			</Grid>
			{/* <Carousel /> */}
		</StyledBox>
	);
};

export default HomePage;
