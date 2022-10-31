import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, styled } from '@mui/material';

import img1 from './assets/1.jpg';
import img2 from './assets/2.jpg';
import img3 from './assets/3.jpg';
import img4 from './assets/4.jpg';
import img5 from './assets/5.jpg';
import img6 from './assets/6.jpg';
import img7 from './assets/7.jpg';

const StyledButton = styled(Button)(({ theme }) => ({
	background: 'transparent !important',
	borderRadius: 999,
	color: 'black',
	position: 'absolute',
	zIndex: 2,
	top: 'calc(50% - 30px)',
	cursor: 'pointer',
	width: 50,
	height: 50,
	'&:hover': {
		color: '#757de8',
	},
	[theme.breakpoints.down('xs')]: {
		display: 'none',
	},
}));

const StyledImg = styled('img')(({ theme }) => ({
	width: '100%',
	height: '100vh',
	padding: '0 10% 5% 10%',
	[theme.breakpoints.down('xs')]: {
		padding: '0 0 10% 0',
	},
}));

export default function DemoCarousel() {
	return (
		<Carousel
			autoPlay='true'
			infiniteLoop='true'
			showThumbs='false'
			interval={4000}
			statusFormatter={() => ``}
			renderThumbs={() => ``}
			renderArrowPrev={(onClickHandler, hasPrev, label) =>
				hasPrev && (
					<StyledButton
						onClick={onClickHandler}
						title={label}
						style={{ left: '10%' }}
					>
						<ArrowBackIosIcon sx={{ fontSize: 30 }} />
					</StyledButton>
				)
			}
			renderArrowNext={(onClickHandler, hasNext, label) =>
				hasNext && (
					<StyledButton
						onClick={onClickHandler}
						title={label}
						style={{ right: '10%' }}
					>
						<ArrowForwardIosIcon sx={{ fontSize: 30 }} />
					</StyledButton>
				)
			}
		>
			{pages.map((page) => (
				<div key={page.id}>
					<StyledImg src={page.source} alt='pages-location' />
				</div>
			))}
		</Carousel>
	);
}

const pages = [
	{
		id: 1,
		source: img1,
	},
	{
		id: 2,
		source: img2,
	},
	{
		id: 3,
		source: img3,
	},
	{
		id: 4,
		source: img4,
	},
	{
		id: 5,
		source: img5,
	},
	{
		id: 6,
		source: img6,
	},
	{
		id: 7,
		source: img7,
	},
];
