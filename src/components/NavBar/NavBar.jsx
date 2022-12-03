import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    KeyboardArrowUp,
    ModeNight,
    GridOn,
    PlaceOutlined,
    FavoriteBorder
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { onValue, ref } from 'firebase/database';

import logo from '../../assets/placeLogo.png';
import { db } from '../../firebase/firebaseConfig';
import { logout } from '../../redux/features/counterSlice';
import { themePreferences } from '../../redux/features/themeSlice';

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
        disableScrollLock={true}
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

const MbBox = styled(Box)({
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: '600'
});

const StyledUserMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
        }}
        disableScrollLock={true}
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
    },
    marginTop: '1.25rem',
    [theme.breakpoints.down('md')]: {
        marginTop: '0.5rem'
    }
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 2rem',
    [theme.breakpoints.down('md')]: {
        padding: 0
    }
}));

const StyledTypoLogo = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    letterSpacing: '0.1rem',
    lineHeight: '1.5rem',
    color: `${theme.palette.mode === 'dark' ? 'var(--white--color)' : 'var(--black--color)'}`,
    textDecoration: 'none',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: '20px'
}));

const StyledTypoMb = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    letterSpacing: '0.1rem',
    lineHeight: '1.5rem',
    color: `${theme.palette.mode === 'dark' ? 'var(--white--color)' : 'var(--black--color)'}`,
    textDecoration: 'none',
    alignItems: 'center',
    textAlign: 'start',
    marginLeft: '20px'
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    position: 'fixed',
    padding: '0 1rem',
    width: '100%',
    backgroundColor: `${theme.palette.mode === 'dark' ? 'var(--black--color)' : 'var(--white--color)'}`,
    backgroundImage: 'none'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    transition: '0.4s all ease-in-out',
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
    color: `${theme.palette.mode === 'dark' ? 'var(--white--color)' : 'var(--black--color)'}`,
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderRadius: 0
}));

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

const StyledExpandMore = styled(ExpandMore)(({ theme }) => ({
    marginRight: 0,
    marginLeft: 'auto',
    transition: '0.4s all ease-in-out',
    color: `${theme.palette.mode === 'dark' ? 'var(--white--color)' : 'var(--black--color)'}`,
    animation: 'spin 0.4s linear 1',
    '@keyframes spin': {
        '0%': { transform: 'rotate(180deg)' },
        '100%': { transform: 'rotate(0deg)' }
    }
}));

const StyledExpandLess = styled(ExpandLess)(({ theme }) => ({
    marginRight: 0,
    marginLeft: 'auto',
    transition: '0.4s all ease-in-out',
    color: `${theme.palette.mode === 'dark' ? 'var(--white--color)' : 'var(--black--color)'}`,
    animation: 'spin 0.4s linear 1',
    '@keyframes spin': {
        '0%': { transform: 'rotate(180deg)' },
        '100%': { transform: 'rotate(0deg)' }
    }
}));

const NormalExpandMore = styled(ExpandMore)(({ theme }) => ({
    marginRight: 0,
    marginLeft: 'auto',
    transition: '0.4s all ease-in-out',
    color: `${theme.palette.mode === 'dark' ? 'var(--white--color)' : 'var(--black--color)'}`
}));

const NormalExpandLess = styled(ExpandLess)(({ theme }) => ({
    marginRight: 0,
    marginLeft: 'auto',
    transition: '0.4s all ease-in-out',
    color: `${theme.palette.mode === 'dark' ? 'var(--white--color)' : 'var(--black--color)'}`
}));

const StyledMenuOutlined = styled(MenuOutlined)(({ theme }) => ({
    transition: '0.4s all ease-in-out',
    color: `${theme.palette.mode === 'dark' ? 'var(--white--color)' : 'var(--black--color)'}`,
    marginTop: '0.5rem'
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '32px 15px',
    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'var(--white--color)' : 'var(--light--gray)'}`
}));

const StyledImg = styled('img')(({ theme }) => ({
    display: 'block'
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    backgroundColor: 'var(--white--color)',
    color: 'var(--black--color)',
    '&:hover': {
        backgroundColor: 'var(--light--gray)'
    }
}));

const NavBar = ({ render }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const username = useSelector((state) => state.counter.username);
    const mode = useSelector((state) => state.theme.value);
    const highlight = useSelector((state) => state.highlight.value);

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorSm, setAnchorSm] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [allowAnimation, setAllowAnimation] = useState(false);

    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const dataRef = ref(db, `/accounts/${username}/avatar`);
        return onValue(dataRef, (dbData) => {
            const loadedData = dbData.val();
            setAvatar(loadedData);
        });
    });

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100
    });

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

    return (
        <StyledAppBar
            style={{
                boxShadow: `${trigger ? `5px 0px 27px -5px ${mode ? 'var(--white--color)' : 'var(--black--color)'}` : 'none'}`
            }}>
            <StyledToolbar disableGutters>
                {/* Small devices */}
                <StyledIconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={handleToggleSidebar}>
                    <StyledMenuOutlined />
                </StyledIconButton>
                <Drawer anchor={'left'} open={openSm}>
                    <Box>
                        <DrawerHeader>
                            <StyledLink
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}
                                to={'/'}
                                onClick={handleToggleSidebar}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginRight: '2rem'
                                    }}>
                                    <StyledImg src={logo} alt="no logo" width="40px" height="40px" />
                                    <StyledTypoMb variant="h6">PLACES COLLECTION</StyledTypoMb>
                                </Box>
                            </StyledLink>
                            <ChevronLeft onClick={handleToggleSidebar} />
                        </DrawerHeader>

                        <StyledList>
                            <MbBox>
                                <ListItem onClick={handleOpenList}>
                                    <GridOn
                                        sx={{
                                            marginRight: '8px',
                                            fontSize: '2rem'
                                        }}
                                    />
                                    <Typography variant="h6">Collections</Typography>
                                    {allowAnimation ? openList ? <StyledExpandLess /> : <StyledExpandMore /> : <NormalExpandMore />}
                                </ListItem>
                            </MbBox>
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

                            <MbBox>
                                <ListItem onClick={handleToggleSidebar}>
                                    <PlaceOutlined
                                        sx={{
                                            marginRight: '8px',
                                            fontSize: '2rem'
                                        }}
                                    />
                                    <Typography variant="h6">
                                        <StyledLink to={`/new-place`}>Add new place</StyledLink>
                                    </Typography>
                                </ListItem>
                            </MbBox>
                            <MbBox>
                                <ListItem onClick={handleToggleSidebar}>
                                    <FavoriteBorder
                                        sx={{
                                            marginRight: '8px',
                                            fontSize: '2rem'
                                        }}
                                    />
                                    <Typography variant="h6">
                                        <StyledLink to={`/favorites`}>My favorites</StyledLink>
                                    </Typography>
                                </ListItem>
                            </MbBox>

                            <MbBox>
                                <ListItem>
                                    <ModeNight
                                        sx={{
                                            transform: 'rotate(45deg)',
                                            marginRight: '8px',
                                            fontSize: '2rem'
                                        }}
                                    />
                                    <Typography variant="h6">Night mode</Typography>
                                    <ModeSwitch
                                        sx={{
                                            marginRight: 0,
                                            marginLeft: 'auto'
                                        }}
                                        checked={Boolean(mode)}
                                        onChange={handlerMode}
                                    />
                                </ListItem>
                            </MbBox>
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
                    <StyledImg
                        src={logo}
                        alt="no logo"
                        width="40px"
                        height="40px"
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'flex'
                            }
                        }}
                    />
                    <StyledTypoLogo
                        variant="h6"
                        sx={{
                            display: {
                                xs: 'none',
                                md: 'flex'
                            }
                        }}>
                        PLACES COLLECTION
                    </StyledTypoLogo>
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
                        <StyledTypography
                            sx={{
                                paddingRight: 0
                            }}>
                            Collections
                        </StyledTypography>
                        {allowAnimation ? !open ? <StyledExpandLess /> : <StyledExpandMore /> : <NormalExpandLess />}
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
                        <StyledTypography
                            sx={{
                                '&:after': {
                                    transform: `${highlight === 'new-place' ? 'scaleX(1)' : 'scaleX(0)'}`
                                }
                            }}>
                            Add New Place
                        </StyledTypography>
                    </StyledLink>
                    <StyledLink to={'/favorites'}>
                        <StyledTypography
                            sx={{
                                '&:after': {
                                    transform: `${highlight === 'favorites' ? 'scaleX(1)' : 'scaleX(0)'}`
                                }
                            }}>
                            My Favorites
                        </StyledTypography>
                    </StyledLink>
                    <StyledLink to={'/shopping'}>
                        <StyledTypography
                            sx={{
                                '&:after': {
                                    transform: `${highlight === 'shopping' ? 'scaleX(1)' : 'scaleX(0)'}`
                                }
                            }}>
                            Shopping
                        </StyledTypography>
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
                    <ModeSwitch
                        sx={{
                            margin: '0.9rem',
                            display: {
                                xs: 'none',
                                sm: 'none',
                                md: 'inline-flex'
                            }
                        }}
                        checked={Boolean(mode)}
                        onChange={handlerMode}
                    />
                    <Tooltip title="Open settings">
                        <Avatar src={avatar || null} alt="Avatar" onClick={(e) => handleOpenUserMenu(e, username)} sx={{ cursor: 'pointer' }} />
                    </Tooltip>

                    <StyledUserMenu
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
            <Fade in={trigger}>
                <Box role="presentation" sx={{ position: 'fixed', bottom: 20, right: 20 }}>
                    <Fab size="small" onClick={() => window.scrollTo(0, 0)}>
                        <KeyboardArrowUp />
                    </Fab>
                </Box>
            </Fade>
        </StyledAppBar>
    );
};
export default NavBar;
