import React from 'react';
import {
	Box,
	Grid,
	Typography,
	styled,
	Container,
	Stack,
	IconButton,
} from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const StyledIconButton = styled(IconButton)({
	color: '#fff',
	'&:hover': {
		color: 'crimson',
	},
	transition: '0.3s ease-in-out',
});
const StyledBox = styled(Box)({
	backgroundColor: '#242424',
	color: '#fff',
	width: '100%',
	position: 'relative',
	bottom: 0,
	padding: '3rem 0',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: '1.2rem',
	height: '100%',
	marginTop: '7rem',
});
const Atag = styled('a')({
	textDecoration: 'none',
	fontSize: '1rem',
	color: '#fff',
	'&:hover': {
		color: 'crimson',
	},
	transition: '0.3s ease-in-out',
});

const Footer = () => {
	return (
		<StyledBox>
			<Container maxWidth='lg' sx={{ textAlign: 'center' }}>
				<Grid container spacing={5}>
					<Grid item xs={4}>
						<Typography
							variant='h5'
							fontWeight='bold'
							textAlign='center'
							sx={{
								display: 'inline-block',
								marginBottom: '1.5rem',
							}}
						>
							About Us
						</Typography>
						<Stack spacing={2}>
							<Atag href='/' rel='noreferrer' target='_blank'>
								About
							</Atag>
							<Atag href='/' rel='noreferrer' target='_blank'>
								How it works
							</Atag>
							<Atag href='/' rel='noreferrer' target='_blank'>
								Testimonials
							</Atag>
							<Atag href='/' rel='noreferrer' target='_blank'>
								Terms of service
							</Atag>
						</Stack>
					</Grid>
					<Grid item xs={4}>
						<Typography
							variant='h5'
							fontWeight='bold'
							textAlign='center'
							sx={{
								display: 'inline-block',
								marginBottom: '1.5rem',
							}}
						>
							Contact Us
						</Typography>
						<Stack spacing={2}>
							<Atag href='/' rel='noreferrer' target='_blank'>
								Contact
							</Atag>
							<Atag href='/' rel='noreferrer' target='_blank'>
								Support
							</Atag>
							<Atag href='/' rel='noreferrer' target='_blank'>
								Destination
							</Atag>
							<Atag href='/' rel='noreferrer' target='_blank'>
								Sponsorships
							</Atag>
						</Stack>
					</Grid>
					<Grid item xs={4}>
						<Typography
							variant='h5'
							fontWeight='bold'
							textAlign='center'
							sx={{
								display: 'inline-block',
								marginBottom: '1.5rem',
							}}
						>
							Social Media
						</Typography>
						<Stack spacing={2}>
							<Atag
								href='https://www.facebook.com/tunglam.262/'
								rel='noreferrer'
								target='_blank'
							>
								Facebook
							</Atag>
							<Atag
								href='https://www.youtube.com/c/LVM262'
								rel='noreferrer'
								target='_blank'
							>
								Youtube
							</Atag>
							<Atag
								href='https://www.instagram.com/_ttlam_/'
								rel='noreferrer'
								target='_blank'
							>
								Instagram
							</Atag>
							<Atag
								href='https://www.linkedin.com/in/ttlam262/'
								rel='noreferrer'
								target='_blank'
							>
								LinkedIn
							</Atag>
							<Atag
								href='https://github.com/Louis2602'
								rel='noreferrer'
								target='_blank'
							>
								Github
							</Atag>
						</Stack>
					</Grid>
				</Grid>
				<Grid container spacing={2} sx={{ marginTop: '1rem' }}>
					<Grid item xs={4}>
						<Atag
							href='/'
							sx={{
								fontSize: '1.5rem',
								fontWeight: 'bold',
								color: 'crimson',
								'&:hover': {
									color: 'orange',
									transition: '0.3s ease-in-out',
								},
							}}
						>
							PLACES COLLECTION
						</Atag>
					</Grid>
					<Grid item xs={4}>
						<Typography>
							© Lam Tran. All rights reserved.
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<StyledIconButton aria-label='facebook'>
							<FacebookIcon />
						</StyledIconButton>
						<StyledIconButton aria-label='instagram'>
							<InstagramIcon />
						</StyledIconButton>
						<StyledIconButton aria-label='youtube'>
							<YouTubeIcon />
						</StyledIconButton>
						<StyledIconButton aria-label='linkedin'>
							<LinkedInIcon />
						</StyledIconButton>
						<StyledIconButton aria-label='github'>
							<GitHubIcon />
						</StyledIconButton>
					</Grid>
				</Grid>
			</Container>
		</StyledBox>
	);
};

export default Footer;
