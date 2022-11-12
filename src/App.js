import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme, Stack, Box, styled, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesContextProvider } from './contexts/FavoritesContext';
import {
    AllCollections,
    NewPlace,
    HomePage,
    Favorites,
    Map,
    NavBar,
    SignIn,
    SignUp,
    Footer,
    ItemDetails
} from './pages';
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
function App() {
    const [mode, setMode] = useState('light');
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#693bd4'
            },
            layer: {
                main: '#ccc'
            },
            mode: mode
        }
    });
    return (
        <FavoritesContextProvider>
            <Router>
                <ThemeProvider theme={darkTheme}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '100vh'
                        }}>
                        <CssBaseline />
                        <NavBar setMode={setMode} mode={mode} />
                        <Box sx={{ flex: 1 }}>
                            <StyledStack spacing={2}>
                                <Routes>
                                    <Route exact path="/" element={<HomePage />}></Route>
                                    <Route path="/map" element={<Map />}></Route>
                                    <Route path="/sign-in" element={<SignIn />}></Route>
                                    <Route path="/sign-up" element={<SignUp />}></Route>
                                    <Route path="/:collection" element={<AllCollections />}></Route>
                                    <Route path="/new-place" element={<NewPlace />}></Route>
                                    <Route path="/favorites" element={<Favorites />}></Route>
                                    <Route path="/:collection/:id" element={<ItemDetails />}></Route>
                                </Routes>
                            </StyledStack>
                        </Box>
                        <Footer />
                    </Box>
                </ThemeProvider>
            </Router>
        </FavoritesContextProvider>
    );
}

export default App;
