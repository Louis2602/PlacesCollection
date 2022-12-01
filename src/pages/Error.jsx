import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<div className='not-found'>
			<img
				src='https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png'
				alt='not-found'
			/>
			<Link to='/' className='link-home'>
				<Typography
					textAlign='center'
					color='primary'
					fontWeight='bold'
				>
					Go Home
				</Typography>
			</Link>
		</div>
	);
};

export default Error;
