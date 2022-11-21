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
    Drawer,
    Grow,
    Collapse
} from '@mui/material';
import { AccountCircle, MenuOutlined, Reviews, Logout, ExpandMore, ExpandLess, ChevronLeft } from '@mui/icons-material';

import { Avatar as AvatarImg } from '../Carousel/assets';

const places = ['restaurants', 'hotels', 'attractions'];

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
    padding: '24px',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: 0
});
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
        borderRadius: 1,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3)',
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

const StyledUserMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
        }}
        transformOrigin={{
            vertical: 'left',
            horizontal: 'right'
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 1,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3)',
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
    justifyContent: 'space-between',
    width: '100%'
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

const StyledAppBar = styled(AppBar)({
    position: 'sticky',
    width: '100%'
});

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit'
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
    borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'white' : '#999'}`
}));
const StyledImg = styled('img')(({ theme }) => ({
    display: 'block',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const NavBar = ({ setMode, mode }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorSm, setAnchorSm] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [allowAnimation, setAllowAnimation] = useState(false);

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
        setAllowAnimation(true);
    };
    const handleClosePlaces = () => {
        setAnchorEl(null);
    };
    const handleOpenList = () => {
        setOpenList(!openList);
        setAllowAnimation(true);
    };

    const open = Boolean(anchorEl);
    const openSm = Boolean(anchorSm);
    const openUser = Boolean(anchorElUser);

    const handleToggleSidebar = () => {
        if (anchorSm) {
            setAnchorSm(false);
            setAllowAnimation(true);
        } else {
            setAnchorSm(true);
            setAllowAnimation(false);
        }
    };

    return (
        <StyledAppBar>
            <Container maxWidth="xl" sx={{ marginY: { xs: '1rem', md: 0 } }}>
                <StyledToolbar disableGutters>
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
                                    {allowAnimation ? !openList ? <StyledExpandLess /> : <StyledExpandMore /> : <ExpandLess />}
                                </ListItem>
                                <Collapse in={openList} timeout="auto" unmountOnExit>
                                    {places.map((place, idx) => (
                                        <StyledLink key={idx} to={`/${place}`}>
                                            <ListItem onClick={handleToggleSidebar}>
                                                <Typography>{place.toUpperCase()}</Typography>
                                            </ListItem>
                                        </StyledLink>
                                    ))}
                                </Collapse>

                                <ListItem onClick={handleToggleSidebar}>
                                    <Typography variant="h6">
                                        <StyledLink to={`/new-place`}> ADD NEW PLACE </StyledLink>
                                    </Typography>
                                </ListItem>

                                <ListItem onClick={handleToggleSidebar}>
                                    <Typography variant="h6">
                                        <StyledLink to={`/favorites`}> MY FAVORITES </StyledLink>
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
                        <StyledImg src="/assets/placeLogo.png" alt="no logo" width="40px" height="40px" />
                        <StyledTypoLogo variant="h6">PLACES COLLECTION</StyledTypoLogo>
                    </StyledLink>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            mx: 2
                        }}>
                        <StyledButton
                            onClick={handleOpenPlaces}
                            endIcon={allowAnimation ? !open ? <StyledExpandLess /> : <StyledExpandMore /> : <ExpandLess />}>
                            Collections
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
                                <Grow in={open} key={idx} {...(open ? { timeout: 600 * idx } : {})}>
                                    <StyledLink to={`/${place}`}>
                                        <MenuItem onClick={handleClosePlaces}>
                                            <Typography textAlign="center">{place.toUpperCase()}</Typography>
                                        </MenuItem>
                                    </StyledLink>
                                </Grow>
                            ))}
                        </StyledMenu>

                        <StyledLink to={'/new-place'}>
                            <StyledButton>Add New Place</StyledButton>
                        </StyledLink>

                        <StyledLink to={'/favorites'}>
                            <StyledButton>My Favorites</StyledButton>
                        </StyledLink>
                    </Box>

                    <Box sx={{ flexGrow: 0, display: 'flex', flexDirection: 'row' }}>
                        <ModeSwitch sx={{ m: 1 }} defaultChecked onChange={handlerMode} />
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Avatar" src={AvatarImg} />
                            </IconButton>
                        </Tooltip>

                        <StyledUserMenu
                            sx={{ mt: { xs: 2.5, md: 1.5 } }}
                            id="menu-appbar"
                            keepMounted
                            anchorEl={anchorElUser}
                            open={openUser}
                            onClose={handleCloseUserMenu}
                            onClick={handleCloseUserMenu}>
                            {userMenu.map((userItem, idx) => (
                                <Grow key={idx} in={openUser} {...(openUser ? { timeout: 600 * idx } : {})}>
                                    <StyledLink to={userItem.link}>
                                        <MenuItem sx={{ px: 2 }}>
                                            <ListItemIcon>
                                                <userItem.icon />
                                            </ListItemIcon>
                                            <Typography textAlign="center">{userItem.obj}</Typography>
                                        </MenuItem>
                                    </StyledLink>
                                </Grow>
                            ))}
                        </StyledUserMenu>
                    </Box>
                </StyledToolbar>
            </Container>
        </StyledAppBar>
    );
};

export default NavBar;
