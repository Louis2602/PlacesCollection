import { Box, Grid, Typography, styled, Container, Stack, IconButton } from '@mui/material';
import { Facebook, Instagram, YouTube, GitHub, LinkedIn } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const StyledIconButton = styled(IconButton)({
    color: 'var(--white--color)',
    '&:hover': {
        color: 'var(--main--hover--color)'
    },
    transition: '0.3s ease-in-out'
});
const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#242424',
    color: 'var(--white--color)',
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
    [theme.breakpoints.down('md')]: {
        padding: '1rem 0'
    }
}));
const Atag = styled('a')(({ theme }) => ({
    textDecoration: 'none',
    fontSize: '1rem',
    color: 'var(--white--color)',
    '&:hover': {
        color: 'var(--main--hover--color)'
    },
    transition: '0.3s ease-in-out',
    [theme.breakpoints.down('md')]: {
        width: '122px'
    }
}));

const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    fontSize: '1rem',
    color: 'var(--white--color)',
    '&:hover': {
        color: 'var(--main--hover--color)'
    },
    transition: '0.3s ease-in-out',
    [theme.breakpoints.down('md')]: {
        width: '122px'
    }
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 0,
        '& .MuiGrid-item': {
            paddingLeft: '1rem'
        }
    }
}));

const StyledBotGrid = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

const StyledLogoATag = styled('a')({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--main--color)',
    '&:hover': {
        color: 'var(--main--hover--color)',
        transition: '0.3s ease-in-out'
    }
});

const StyledFooterTypo = styled(Typography)(({ theme }) => ({
    display: 'inline-block',
    marginBottom: '1.5rem',
    [theme.breakpoints.down('md')]: {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '140px'
    }
}));

const Footer = () => {
    return (
        <StyledBox>
            <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                <StyledGrid container spacing={5}>
                    <StyledGrid item xs={10} md={4}>
                        <StyledFooterTypo variant="h5" fontWeight="bold" textAlign="center">
                            About Us
                        </StyledFooterTypo>
                        <Stack spacing={2}>
                            <StyledLink to="/about">About</StyledLink>
                            <StyledLink to="/howitworks">How it works</StyledLink>
                            <StyledLink to="/testimonials">Testimonials</StyledLink>
                            <StyledLink to="/termsofservice">Terms of service</StyledLink>
                        </Stack>
                    </StyledGrid>

                    <StyledGrid item xs={10} md={4}>
                        <StyledFooterTypo variant="h5" fontWeight="bold" textAlign="center">
                            Contact Us
                        </StyledFooterTypo>
                        <Stack spacing={2}>
                            <StyledLink to="/contact">Contact</StyledLink>
                            <StyledLink to="/support">Support</StyledLink>
                            <StyledLink to="/destination">Destination</StyledLink>
                            <StyledLink to="/sponsorships">Sponsorships</StyledLink>
                        </Stack>
                    </StyledGrid>

                    <StyledGrid item xs={10} md={4}>
                        <StyledFooterTypo variant="h5" fontWeight="bold" textAlign="center">
                            Social Media
                        </StyledFooterTypo>
                        <Stack spacing={2}>
                            <Atag href="https://www.facebook.com/tunglam.262/" rel="noreferrer" target="_blank">
                                Facebook
                            </Atag>
                            <Atag href="https://www.youtube.com/c/LVM262" rel="noreferrer" target="_blank">
                                Youtube
                            </Atag>
                            <Atag href="https://www.instagram.com/_ttlam_/" rel="noreferrer" target="_blank">
                                Instagram
                            </Atag>
                            <Atag href="https://www.linkedin.com/in/ttlam262/" rel="noreferrer" target="_blank">
                                LinkedIn
                            </Atag>
                            <Atag href="https://github.com/Louis2602" rel="noreferrer" target="_blank">
                                Github
                            </Atag>
                        </Stack>
                    </StyledGrid>
                </StyledGrid>

                <StyledBotGrid container spacing={2} sx={{ marginTop: '2rem' }}>
                    <StyledBotGrid item xs={10} md={4}>
                        <StyledLogoATag href="/">PLACES COLLECTION</StyledLogoATag>
                    </StyledBotGrid>

                    <StyledBotGrid item xs={10} md={4}>
                        <Typography>© Lam Tran. All rights reserved.</Typography>
                    </StyledBotGrid>

                    <StyledBotGrid item xs={8} md={4}>
                        <StyledIconButton aria-label="facebook">
                            <Facebook />
                        </StyledIconButton>
                        <StyledIconButton aria-label="instagram">
                            <Instagram />
                        </StyledIconButton>
                        <StyledIconButton aria-label="youtube">
                            <YouTube />
                        </StyledIconButton>
                        <StyledIconButton aria-label="linkedin">
                            <LinkedIn />
                        </StyledIconButton>
                        <StyledIconButton aria-label="github">
                            <GitHub />
                        </StyledIconButton>
                    </StyledBotGrid>
                </StyledBotGrid>
            </Container>
        </StyledBox>
    );
};

export default Footer;
