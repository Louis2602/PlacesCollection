import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AllRestaurants from './pages/AllRestaurants';
import AllHotels from './pages/AllHotels';
import AllAttractions from './pages/AllAttractions';
import NewPlace from './pages/NewPlace';
import HomePage from './pages/HomePage';
import Favorites from './pages/Favorites';
import Map from './pages/Map';
import NavBar from './components/NavBar/NavBar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import { FavoritesContextProvider } from './contexts/FavoritesContext';
import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme, Stack, Box, styled, CssBaseline } from '@mui/material';

import './App.css';

const StyledStack = styled(Stack)({
	margin: '3rem auto',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});
function App() {
	const [mode, setMode] = useState('light');
	const darkTheme = createTheme({
		palette: {
			primary: {
				main: '#693bd4',
			},
			layer: {
				main: '#ccc',
			},
			mode: mode,
		},
	});
	return (
		<FavoritesContextProvider>
			<Router>
				<ThemeProvider theme={darkTheme}>
					<Box>
						<CssBaseline />
						<NavBar setMode={setMode} mode={mode} />
						<StyledStack spacing={2}>
							<Routes>
								<Route
									exact
									path='/'
									element={<HomePage />}
								></Route>
								<Route path='/map' element={<Map />}></Route>
								<Route
									path='/sign-in'
									element={<SignIn />}
								></Route>
								<Route
									path='/sign-up'
									element={<SignUp />}
								></Route>
								<Route
									path='/Restaurants'
									element={<AllRestaurants />}
								></Route>
								<Route
									path='/Hotels'
									element={<AllHotels />}
								></Route>
								<Route
									path='/Attractions'
									element={<AllAttractions />}
								></Route>
								<Route
									path='/new-place'
									element={<NewPlace />}
								></Route>
								<Route
									path='/favorites'
									element={<Favorites />}
								></Route>
							</Routes>
						</StyledStack>
					</Box>
				</ThemeProvider>
			</Router>
		</FavoritesContextProvider>
	);
}

export default App;
