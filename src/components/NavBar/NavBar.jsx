import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    styled,
    Box,
    Switch,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    List,
    ListItem,
    ListItemIcon,
    Drawer
} from '@mui/material';
import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    Logout,
    AccountCircle,
    Reviews,
    MenuOutlined
} from '@mui/icons-material';

import { Avatar as AvatarImg } from '../Carousel/assets';

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
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
            }
        }
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
        borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'white' : '#999'}`,
        alignItems: 'center',
        justiftContent: 'center',
        display: 'flex'
    }
}));
const StyledButton = styled(Button)({
    '&:hover': {
        color: 'black',
        backgroundColor: 'white'
    },

    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: 0
});
const StyledMenu = styled((props) => (
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
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 0,
        '& .MuiMenu-list': {
            padding: 0,
            width: '180px'
        },
        '& .MuiMenuItem-root': {
            padding: 10,
            borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'white' : '#999'}`
        }
    }
}));
const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
});

const StyledTypoLogo = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    fontWeight: 700,
    letterSpacing: '.3rem',
    lineHeight: '1.5rem',
    color: 'inherit',
    textDecoration: 'none',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: '20px',
    [theme.breakpoints.down('md')]: {
        letterSpacing: '0.1rem',
        marginLeft: '10px'
    }
}));

const StyledAppBar = styled(AppBar)({});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    marginRight: '1rem',
    [theme.breakpoints.down('md')]: {
        display: 'block',
        marginRight: '.2rem'
    }
}));

const NavBar = ({ setMode, mode }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorSm, setAnchorSm] = useState(false);

    const handlerMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenPlaces = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosePlaces = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const openSm = Boolean(anchorSm);

    const handleToggleSidebar = () => setAnchorSm(!anchorSm);

    return (
        <StyledAppBar position="static">
            <Container maxWidth="xl" sx={{ marginY: { xs: '1rem', md: 0 } }}>
                <StyledToolbar disableGutters>
                    {/* Small devices */}
                    <StyledIconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleToggleSidebar}>
                        <MenuOutlined />
                    </StyledIconButton>
                    <Drawer sx={{ width: '50%' }} anchor={'left'} open={openSm} onClick={handleToggleSidebar}>
                        <Box>
                            <StyledList>
                                <ListItem sx={{ paddingY: 3 }}>
                                    <img
                                        src="/assets/placeLogo.png"
                                        alt="no logo"
                                        width="40px"
                                        height="40px"
                                    />
                                    <StyledTypoLogo variant="h7">PLACES COLLECTION</StyledTypoLogo>
                                </ListItem>
                                <ListItem onClick={handleToggleSidebar}>
                                    <Typography textAlign="center"> - COLLECTIONS:</Typography>
                                </ListItem>

                                {places.map((place, idx) => (
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit'
                                        }}
                                        key={idx}
                                        to={`/${place}`}>
                                        <ListItem  onClick={handleToggleSidebar}>
                                            <Typography textAlign="center">
                                                + {place.toUpperCase()}
                                            </Typography>
                                        </ListItem>
                                    </Link>
                                ))}

                                <ListItem onClick={handleToggleSidebar}>
                                    <Typography>
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit'
                                            }}
                                            to={`/new-place`}>
                                            - ADD NEW PLACE
                                        </Link>
                                    </Typography>
                                </ListItem>

                                <ListItem onClick={handleToggleSidebar}>
                                    <Typography>
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit'
                                            }}
                                            to={`/favorites`}>
                                            - MY FAVORITES
                                        </Link>
                                    </Typography>
                                </ListItem>
                            </StyledList>
                        </Box>
                    </Drawer>

                    {/* Medium devices */}

                    <Link
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                        to={'/'}>
                        <img src="/assets/placeLogo.png" alt="no logo" width="40px" height="40px" />
                        <StyledTypoLogo variant="h6">PLACES COLLECTION</StyledTypoLogo>
                    </Link>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            mx: 2
                        }}>
                        <StyledButton
                            onClick={handleOpenPlaces}
                            sx={{
                                color: 'white',
                                display: 'relative',
                                p: 3
                            }}>
                            Collections
                            {open ? (
                                <KeyboardArrowDown
                                    sx={{
                                        verticalAlign: 'top'
                                    }}
                                />
                            ) : (
                                <KeyboardArrowUp
                                    sx={{
                                        verticalAlign: 'top'
                                    }}
                                />
                            )}
                        </StyledButton>
                        <StyledMenu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClosePlaces}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button'
                            }}>
                            {places.map((place, idx) => (
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit'
                                    }}
                                    key={idx}
                                    to={`/${place}`}>
                                    <MenuItem  onClick={handleClosePlaces}>
                                        <Typography textAlign="center">{place.toUpperCase()}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </StyledMenu>
                        <Link
                            style={{
                                textDecoration: 'none',
                                color: 'inherit'
                            }}
                            to={'/new-place'}>
                            <StyledButton sx={{ p: 3, color: 'white', display: 'block' }}>
                                Add New Place
                            </StyledButton>
                        </Link>
                        <Link
                            style={{
                                textDecoration: 'none',
                                color: 'inherit'
                            }}
                            to={'/favorites'}>
                            <StyledButton sx={{ p: 3, color: 'white', display: 'block' }}>
                                My Favorites
                            </StyledButton>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'row' }}>
                        <ModeSwitch sx={{ m: 1 }} defaultChecked onChange={handlerMode} />
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Avatar" src={AvatarImg} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: { xs: 2.5, md: 1.5 } }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            onClick={handleCloseUserMenu}>
                            <MenuItem sx={{ px: 2 }}>
                                <ListItemIcon>
                                    <AccountCircle fontSize="small" />
                                </ListItemIcon>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem sx={{ px: 2 }}>
                                <ListItemIcon>
                                    <Reviews fontSize="small" />
                                </ListItemIcon>
                                <Typography textAlign="center">Reviews</Typography>
                            </MenuItem>
                            <MenuItem sx={{ px: 2 }}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </StyledToolbar>
            </Container>
        </StyledAppBar>
    );
};

export default NavBar;
