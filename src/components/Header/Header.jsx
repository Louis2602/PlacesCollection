import React from 'react';

import { Box, Grid, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import home from '../../assets/home.png';

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
const Container = styled(Box)(({ theme }) => ({
	marginTop: '8rem',
	padding: '0 6rem',
	[theme.breakpoints.down('sm')]: {
		padding: 0,
	},
}));
const StyledTypoQuote = styled(Typography)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		display: 'block',
		fontSize: '2rem',
	},
}));
const Ellipse = styled('div')({
	zIndex: '-1',
	position: 'absolute',
	top: '15%',
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
const ImgContainer = styled(Grid)(({ theme }) => ({
	textAlign: 'center',
	position: 'relative',
	zIndex: '10',
	[theme.breakpoints.down('md')]: {
		display: 'none',
	},
}));
const StyledName = styled(Typography)({
	background: 'linear-gradient(to right bottom, #F53844, #42378F)',
	backgroundSize: '100% 100%,0',
	backgroundClip: 'text',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	fontSize: '2rem',
	fontWeight: 'bold',
});
const StyledParagraph = styled(Typography)({
	fontStyle: 'italic',
});
const Header = () => {
	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item md={12} lg={6}>
					<Box>
						<StyledName>DSC TEAM</StyledName>
						<StyledTypoQuote
							variant='h1'
							textAlign='start'
							fontWeight='bold'
							gutterBottom
						>
							A{' '}
							<span
								style={{
									background:
										'linear-gradient(-45deg, #e250e5, #4b50e6, #e250e5, #4b50e6)',
									backgroundSize: '100% 100%,0',
									backgroundClip: 'text',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
								}}
							>
								Places Collection
							</span>{' '}
							for everyone
						</StyledTypoQuote>
						<StyledParagraph sx={{ display: 'block' }} mb='1rem'>
							Lorem ipsum dolor sit amet, consectetur adipisicing
							elit. Repudiandae autem, natus illo in iure sequi
							laboriosam velit perferendis vitae? Nulla.
						</StyledParagraph>
						<StyledTypography>
							<StyledLink to={'/sign-up'}>Sign Up</StyledLink>
						</StyledTypography>
					</Box>
				</Grid>
				<ImgContainer
					item
					md={12}
					lg={6}
					sx={{
						display: { md: 'none', lg: 'block' },
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
		</Container>
	);
};

export default Header;
