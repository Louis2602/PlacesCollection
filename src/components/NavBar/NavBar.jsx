import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/placeLogo.png';
import {
    styled,
    Box,
    Switch,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Avatar,
    Tooltip,
    MenuItem,
    List,
    ListItem,
    ListItemIcon,
    Drawer,
    Grow,
    Collapse,
    useScrollTrigger,
    Fade,
    Fab
} from '@mui/material';
import {
    AccountCircle,
    MenuOutlined,
    Reviews,
    Logout,
    ExpandMore,
    ExpandLess,
    ChevronLeft,
    Restaurant,
    Hotel,
    Attractions,
    KeyboardArrowUp
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { logout } from '../../redux/features/counterSlice';
import { themePreferences } from '../../redux/features/themeSlice';
import { useGetAvatarQuery } from '../../redux/services/fetchAPI';

const places = [
    { obj: 'Restaurants', icon: Restaurant, link: 'restaurants' },
    { obj: 'Hotels', icon: Hotel, link: 'hotels' },
    { obj: 'Attractions', icon: Attractions, link: 'attractions' }
];
const userMenu = [
    { obj: 'Profile', icon: AccountCircle, link: 'profile' },
    { obj: 'Reviews', icon: Reviews, link: 'reviews' },
    { obj: 'Logout', icon: Logout, link: 'sign-in' }
];

const ModeSwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: 'var(--white--color)',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    'yellow'
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
            }
        }
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : 'var(--white--color)',
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
                '#d66c0f'
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
        }
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2
    }
}));
const StyledList = styled(List)(({ theme }) => ({
    '& .MuiListItem-root': {
        borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'var(--white--color)' : 'var(--light--gray)'}`,
        alignItems: 'center',
        justiftContent: 'center',
        display: 'flex'
    }
}));

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '15px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3)',
        '& .MuiMenu-list': {
            padding: 0,
            width: '180px'
        },
        '& .MuiMenuItem-root': {
            borderBottom: '1px solid var(--light--gray)',
            padding: 10
        }
    }
}));

const StyledUserMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '15px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3)',
        '& .MuiMenu-list': {
            padding: 0,
            width: '180px'
        },
        '& .MuiMenuItem-root': {
            borderBottom: '1px solid var(--light--gray)',
            padding: 10
        }
    }
}));

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: 0,
    padding: '0 2rem'
});

const StyledTypoLogo = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    letterSpacing: '0.1rem',
    lineHeight: '1.5rem',
    color: 'inherit',
    textDecoration: 'none',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: '20px',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const StyledAppBar = styled(AppBar)({
    top: 0,
    zIndex: 1000,
    width: '100%',
    backgroundColor: 'inherit',
    boxShadow: 'none'
});

const StyledTypography = styled(Typography)({
    transition: '400ms all ease-in-out',
    display: 'inline-block',
    '&:after': {
        display: 'block',
        content: '""',
        borderBottom: 'solid 3px',
        borderImage: 'linear-gradient(to right bottom, var(--purple--color), var(--pink--color)) 1',
        transform: 'scaleX(0)',
        transition: 'transform 250ms ease-in-out'
    },
    '&:hover:after': {
        transform: 'scaleX(1)'
    },
    cursor: 'pointer',
    padding: '24px',
    color: 'inherit',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderRadius: 0
});
const StyledLink = styled(Link)({
    color: 'inherit',
    textDecoration: 'none'
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    marginRight: '1rem',
    [theme.breakpoints.down('md')]: {
        display: 'block',
        marginRight: '.2rem'
    }
}));

const StyledExpandMore = styled(ExpandMore)({
    animation: 'spin 0.4s linear 1',
    '@keyframes spin': {
        '0%': { transform: 'rotate(180deg)' },
        '100%': { transform: 'rotate(0deg)' }
    }
});

const StyledExpandLess = styled(ExpandLess)({
    animation: 'spin 0.4s linear 1',
    '@keyframes spin': {
        '0%': { transform: 'rotate(180deg)' },
        '100%': { transform: 'rotate(0deg)' }
    }
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '32px 15px',
    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'var(--white--color)' : 'var(--light--gray)'}`
}));

const StyledImg = styled('img')(({ theme }) => ({
    display: 'block',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    backgroundColor: 'var(--white--color)',
    color: 'var(--black--color)',
    '&:hover': {
        backgroundColor: 'var(--light--gray)'
    }
}));
const ScrollTop = (props) => {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center'
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                {children}
            </Box>
        </Fade>
    );
};

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func
};
const NavBar = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const username = useSelector((state) => state.counter.username);
    const mode = useSelector((state) => state.theme.value);
    // const highlight = useSelector((state) => state.highlight.value);
    const { data: avatar, isFetching } = useGetAvatarQuery(username || '');

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorSm, setAnchorSm] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [allowAnimation, setAllowAnimation] = useState(false);

    const handlerMode = () => {
        dispatch(themePreferences(!mode));
    };

    const handleOpenUserMenu = (event, username) => {
        if (username) {
            setAnchorElUser(event.currentTarget);
        } else {
            enqueueSnackbar('Sign in to access!', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
            navigate('/sign-in');
        }
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenPlaces = (event) => {
        setAllowAnimation(true);
        setAnchorEl(event.currentTarget);
    };
    const handleClosePlaces = () => {
        setAnchorEl(null);
    };

    const handleOpenList = () => {
        setOpenList(!openList);
        setAllowAnimation(true);
    };

    const handleToggleSidebar = () => {
        if (anchorSm) {
            setAnchorSm(false);
            setAllowAnimation(true);
        } else {
            setAnchorSm(true);
            setAllowAnimation(false);
        }
    };

    const handleUserMenu = (action) => {
        if (action === 'Logout') dispatch(logout());
    };

    const open = Boolean(anchorEl);
    const openSm = Boolean(anchorSm);
    const openUser = Boolean(anchorElUser);

    if (isFetching) return <div className="loader" />;

    return (
        <StyledAppBar position="static">
            <StyledToolbar disableGutters id="back-to-top-anchor">
                {/* Small devices */}
                <StyledIconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleToggleSidebar}>
                    <MenuOutlined />
                </StyledIconButton>
                <Drawer anchor={'left'} open={openSm}>
                    <Box>
                        <DrawerHeader>
                            <ChevronLeft onClick={handleToggleSidebar} />
                        </DrawerHeader>

                        <StyledList>
                            <ListItem onClick={handleOpenList}>
                                <Typography variant="h6">COLLECTIONS</Typography>
                                {allowAnimation ? openList ? <StyledExpandLess /> : <StyledExpandMore /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openList} timeout="auto" unmountOnExit>
                                {places.map((place, idx) => (
                                    <StyledLink key={idx} to={place.link}>
                                        <ListItem onClick={handleToggleSidebar}>
                                            <ListItemIcon sx={{ color: '#777' }}>
                                                <place.icon />
                                            </ListItemIcon>
                                            <Typography>{place.obj}</Typography>
                                        </ListItem>
                                    </StyledLink>
                                ))}
                            </Collapse>

                            <ListItem onClick={handleToggleSidebar}>
                                <Typography variant="h6">
                                    <StyledLink to={`/new-place`}>ADD NEW PLACE</StyledLink>
                                </Typography>
                            </ListItem>

                            <ListItem onClick={handleToggleSidebar}>
                                <Typography variant="h6">
                                    <StyledLink to={`/favorites`}>MY FAVORITES</StyledLink>
                                </Typography>
                            </ListItem>
                        </StyledList>
                    </Box>
                </Drawer>

                {/* Medium devices */}

                <StyledLink
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                    to={'/'}>
                    <StyledImg src={logo} alt="no logo" width="40px" height="40px" />
                    <StyledTypoLogo variant="h6">PLACES COLLECTION</StyledTypoLogo>
                </StyledLink>

                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        mx: 2
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingRight: '24px'
                        }}
                        onClick={handleOpenPlaces}>
                        <StyledTypography sx={{ paddingRight: 0 }}>Collections</StyledTypography>
                        {allowAnimation ? !open ? <StyledExpandLess /> : <StyledExpandMore /> : <ExpandLess />}
                        {/* <Box
							sx={{
								display: 'flex',
								// verticalAlign: 'sub',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						></Box> */}
                    </Box>
                    <StyledMenu
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        MenuListProps={{ onMouseLeave: handleClosePlaces }}
                        onClose={handleClosePlaces}>
                        {places.map((place, idx) => (
                            <Grow in={open} key={idx} {...(open ? { timeout: 600 * idx } : {})}>
                                <StyledLink to={place.link}>
                                    <StyledMenuItem onClick={handleClosePlaces} onClose={handleClosePlaces}>
                                        <ListItemIcon sx={{ color: '#777' }}>
                                            <place.icon />
                                        </ListItemIcon>
                                        <Typography textAlign="center">{place.obj}</Typography>
                                    </StyledMenuItem>
                                </StyledLink>
                            </Grow>
                        ))}
                    </StyledMenu>
                    <StyledLink to={'/new-place'}>
                        <StyledTypography>Add New Place</StyledTypography>
                    </StyledLink>
                    <StyledLink to={'/favorites'}>
                        <StyledTypography>My Favorites</StyledTypography>
                    </StyledLink>
                </Box>
                <Box
                    sx={{
                        flexGrow: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <ModeSwitch sx={{ margin: '0.9rem' }} checked={mode} onChange={handlerMode} />
                    <Tooltip title="Open settings">
                        <Avatar src={avatar || null} alt="Avatar" onClick={(e) => handleOpenUserMenu(e, username)} sx={{ cursor: 'pointer' }} />
                    </Tooltip>

                    <StyledUserMenu
                        sx={{ mt: { xs: 2.5, md: 1.1 } }}
                        keepMounted
                        anchorEl={anchorElUser}
                        open={openUser}
                        onClick={handleCloseUserMenu}
                        MenuListProps={{
                            onMouseLeave: handleCloseUserMenu
                        }}
                        onClose={handleCloseUserMenu}>
                        {userMenu.map((userItem, idx) => (
                            <Grow key={idx} in={openUser} {...(openUser ? { timeout: 600 * idx } : {})}>
                                <StyledLink to={userItem.link} onClick={() => handleUserMenu(userItem.obj)}>
                                    <StyledMenuItem sx={{ px: 2 }}>
                                        <ListItemIcon sx={{ color: '#777' }}>
                                            <userItem.icon />
                                        </ListItemIcon>
                                        <Typography textAlign="center">{userItem.obj}</Typography>
                                    </StyledMenuItem>
                                </StyledLink>
                            </Grow>
                        ))}
                    </StyledUserMenu>
                </Box>
            </StyledToolbar>
            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUp />
                </Fab>
            </ScrollTop>
        </StyledAppBar>
    );
};
export default NavBar;
