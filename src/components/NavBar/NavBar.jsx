import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import Switch from '@mui/material/Switch';
import { ListItemIcon } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReviewsIcon from '@mui/icons-material/Reviews';

const places = ['restaurants', 'hotels', 'attractions'];

const ModeSwitch = styled(Switch)(({ theme }) => ({
	width: 62,
	height: 34,
	padding: 7,
	'& .MuiSwitch-switchBase': {
		margin: 1,
		padding: 0,
		transform: 'translateX(6px)',
		'&.Mui-checked': {
			color: '#fff',
			transform: 'translateX(22px)',
			'& .MuiSwitch-thumb:before': {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					'#fff'
				)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
			},
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor:
					theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
			},
		},
	},
	'& .MuiSwitch-thumb': {
		backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
		width: 32,
		height: 32,
		'&:before': {
			content: "''",
			position: 'absolute',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				'#fff'
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
		},
	},
	'& .MuiSwitch-track': {
		opacity: 1,
		backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
		borderRadius: 20 / 2,
	},
}));

const StyledButton = styled(Button)({
	'&:hover': {
		color: 'black',
		backgroundColor: 'white',
	},
	fontSize: '1rem',
	fontWeight: 'bold',
	borderRadius: 0,
});
const StyledToolbar = styled(Toolbar)({
	display: 'flex',
	justifyContent: 'space-between',
});
const StyledAppBar = styled(AppBar)({});
const NavBar = ({ setMode, mode }) => {
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);

	const handlerMode = () => {
		setMode(mode === 'light' ? 'dark' : 'light');
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const open = Boolean(anchorEl);

	const handleOpenPlaces = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClosePlaces = () => {
		setAnchorEl(null);
	};

	return (
		<StyledAppBar position='static'>
			<Container maxWidth='xl'>
				<StyledToolbar disableGutters>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ display: { xs: 'block', md: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<img
						src='/assets/placeLogo.png'
						alt='no logo'
						width='40px'
						height='40px'
						style={{ margin: '0 1rem' }}
					/>
					<Typography
						variant='h6'
						noWrap
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						<Link
							style={{
								textDecoration: 'none',
								color: 'inherit',
							}}
							to={'/'}
						>
							PLACES COLLECTION
						</Link>
					</Typography>
					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
							mx: 2,
						}}
					>
						<StyledButton
							onClick={handleOpenPlaces}
							sx={{
								color: 'white',
								display: 'block',
								p: 3,
							}}
						>
							Collections
							<ArrowDropDownIcon
								sx={{
									verticalAlign: 'top',
								}}
							/>
						</StyledButton>
						<Menu
							sx={{ mt: 5 }}
							id='basic-menu'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={open}
							onClose={handleClosePlaces}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							{places.map((place, idx) => (
								<MenuItem key={idx} onClick={handleClosePlaces}>
									<Typography textAlign='center'>
										<Link
											style={{
												textDecoration: 'none',
												color: 'inherit',
											}}
											to={`/${place}`}
										>
											{place.toUpperCase()}
										</Link>
									</Typography>
								</MenuItem>
							))}
						</Menu>
						<Link
							style={{
								textDecoration: 'none',
								color: 'inherit',
							}}
							to={'/new-place'}
						>
							<StyledButton
								sx={{ p: 3, color: 'white', display: 'block' }}
							>
								Add New Place
							</StyledButton>
						</Link>
						<Link
							style={{
								textDecoration: 'none',
								color: 'inherit',
							}}
							to={'/favorites'}
						>
							<StyledButton
								sx={{ p: 3, color: 'white', display: 'block' }}
							>
								My Favorites
							</StyledButton>
						</Link>
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<ModeSwitch
							sx={{ m: 1 }}
							defaultChecked
							onChange={handlerMode}
						/>
						<Tooltip title='Open settings'>
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar
									alt=''
									src='https://media.wired.com/photos/592676467034dc5f91beb80e/master/pass/MarkZuckerberg.jpg'
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: 6 }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
							onClick={handleCloseUserMenu}
						>
							<MenuItem sx={{ px: 2 }}>
								<ListItemIcon>
									<AccountCircleIcon fontSize='small' />
								</ListItemIcon>
								<Typography textAlign='center'>
									Profile
								</Typography>
							</MenuItem>
							<MenuItem sx={{ px: 2 }}>
								<ListItemIcon>
									<ReviewsIcon fontSize='small' />
								</ListItemIcon>
								<Typography textAlign='center'>
									Reviews
								</Typography>
							</MenuItem>
							<MenuItem sx={{ px: 2 }}>
								<ListItemIcon>
									<Logout fontSize='small' />
								</ListItemIcon>
								<Typography textAlign='center'>
									Logout
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</StyledToolbar>
			</Container>
		</StyledAppBar>
	);
};

export default NavBar;
