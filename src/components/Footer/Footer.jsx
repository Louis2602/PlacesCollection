import { Box, Grid, Typography, styled, Container, Stack, IconButton } from '@mui/material';
import { Facebook, Instagram, YouTube, GitHub, LinkedIn } from '@mui/icons-material';

const StyledIconButton = styled(IconButton)({
    color: '#fff',
    '&:hover': {
        color: 'crimson'
    },
    transition: '0.3s ease-in-out'
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
    marginTop: '7rem'
});
const Atag = styled('a')({
    textDecoration: 'none',
    fontSize: '1rem',
    color: '#fff',
    '&:hover': {
        color: 'crimson'
    },
    transition: '0.3s ease-in-out'
});

const StyledGrid = styled(Grid)(({ theme }) => ({
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const StyledLogoATag = styled('a')({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'crimson',
    '&:hover': {
        color: 'orange',
        transition: '0.3s ease-in-out'
    }
});

const StyledFooterTypo = styled(Typography)({
    display: 'inline-block',
    marginBottom: '1.5rem'
});

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
                            <Atag href="/" rel="noreferrer" target="_blank">
                                About
                            </Atag>
                            <Atag href="/" rel="noreferrer" target="_blank">
                                How it works
                            </Atag>
                            <Atag href="/" rel="noreferrer" target="_blank">
                                Testimonials
                            </Atag>
                            <Atag href="/" rel="noreferrer" target="_blank">
                                Terms of service
                            </Atag>
                        </Stack>
                    </StyledGrid>

                    <StyledGrid item xs={10} md={4}>
                        <StyledFooterTypo variant="h5" fontWeight="bold" textAlign="center">
                            Contact Us
                        </StyledFooterTypo>
                        <Stack spacing={2}>
                            <Atag href="/" rel="noreferrer" target="_blank">
                                Contact
                            </Atag>
                            <Atag href="/" rel="noreferrer" target="_blank">
                                Support
                            </Atag>
                            <Atag href="/" rel="noreferrer" target="_blank">
                                Destination
                            </Atag>
                            <Atag href="/" rel="noreferrer" target="_blank">
                                Sponsorships
                            </Atag>
                        </Stack>
                    </StyledGrid>

                    <StyledGrid item xs={10} md={4}>
                        <StyledFooterTypo variant="h5" fontWeight="bold" textAlign="center">
                            Social Media
                        </StyledFooterTypo>
                        <Stack spacing={2}>
                            <Atag
                                href="https://www.facebook.com/tunglam.262/"
                                rel="noreferrer"
                                target="_blank">
                                Facebook
                            </Atag>
                            <Atag href="https://www.youtube.com/c/LVM262" rel="noreferrer" target="_blank">
                                Youtube
                            </Atag>
                            <Atag href="https://www.instagram.com/_ttlam_/" rel="noreferrer" target="_blank">
                                Instagram
                            </Atag>
                            <Atag
                                href="https://www.linkedin.com/in/ttlam262/"
                                rel="noreferrer"
                                target="_blank">
                                LinkedIn
                            </Atag>
                            <Atag href="https://github.com/Louis2602" rel="noreferrer" target="_blank">
                                Github
                            </Atag>
                        </Stack>
                    </StyledGrid>
                </StyledGrid>

                <StyledGrid container spacing={2} sx={{ marginTop: '2rem' }}>
                    <StyledGrid item xs={10} md={4}>
                        <StyledLogoATag href="/">PLACES COLLECTION</StyledLogoATag>
                    </StyledGrid>

                    <StyledGrid item xs={10} md={4}>
                        <Typography>© Lam Tran. All rights reserved.</Typography>
                    </StyledGrid>

                    <StyledGrid item xs={8} md={4}>
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
                    </StyledGrid>
                </StyledGrid>
            </Container>
        </StyledBox>
    );
};

export default Footer;
