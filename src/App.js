import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme, Stack, Box, styled, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import {
    AllCollections,
    NewPlace,
    HomePage,
    Map,
    NavBar,
    SignIn,
    SignUp,
    Footer,
    ItemDetails,
    Reviews,
    Profile,
    Error,
    About,
    Howitworks,
    Testimonials,
    Termsofservice,
    Contact,
    Destination,
    Sponsorships,
    Support
} from './pages';
import ScrollToTop from './assets/ScrollToTop';
import './App.css';

const StyledStack = styled(Stack)(({ theme }) => ({
    margin: '3rem 1rem',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: '3rem auto'
    }
}));

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0
}));

function App() {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.value);
    const [highlight, setHighlight] = useState('');
    const darkTheme = createTheme({
        palette: {
            mode: `${mode ? 'dark' : 'light'}`
        }
    });

    return (
        <Router>
            <ScrollToTop />
            <ThemeProvider theme={darkTheme}>
                <SnackbarProvider maxSnack={3}>
                    <CssBaseline />
                    <StyledBox>
                        <NavBar setHighlight={setHighlight} highlight={highlight} />
                        <Box sx={{ minHeight: '30rem' }}>
                            <StyledStack spacing={2}>
                                <Routes>
                                    <Route exact path="/" element={<HomePage />}></Route>
                                    <Route path="/map" element={<Map />}></Route>
                                    <Route path="/sign-in" element={<SignIn />}></Route>
                                    <Route path="/sign-up" element={<SignUp />}></Route>
                                    <Route path="/restaurants" element={<AllCollections collection="restaurants" />}></Route>
                                    <Route path="/hotels" element={<AllCollections collection="hotels" />}></Route>
                                    <Route path="/attractions" element={<AllCollections collection="attractions" />}></Route>
                                    <Route path="/favorites" element={<AllCollections collection="favorites" />}></Route>
                                    <Route path="/new-place" element={<NewPlace setHighlight={setHighlight} />}></Route>
                                    <Route path="/:collection/:id" element={<ItemDetails />}></Route>
                                    <Route path="/reviews" element={<Reviews />}></Route>
                                    <Route path="/profile" element={<Profile />}></Route>
                                    <Route path="/about" element={<About />}></Route>
                                    <Route path="/howitworks" element={<Howitworks />}></Route>
                                    <Route path="/testimonials" element={<Testimonials />}></Route>
                                    <Route path="/termsofservice" element={<Termsofservice />}></Route>
                                    <Route path="/contact" element={<Contact />}></Route>
                                    <Route path="/support" element={<Support />}></Route>
                                    <Route path="/destination" element={<Destination />}></Route>
                                    <Route path="/sponsorships" element={<Sponsorships />}></Route>
                                    <Route path="/:error" element={<Error />}></Route>
                                </Routes>
                            </StyledStack>
                        </Box>
                        <Footer />
                    </StyledBox>
                </SnackbarProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
