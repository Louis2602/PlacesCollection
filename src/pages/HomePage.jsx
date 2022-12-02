import React from 'react';

import { Stack } from '@mui/material';
import Carousel from '../components/Carousel/Carousel';
import Header from '../components/Header/Header';

const HomePage = () => {
    return (
        <Stack spacing={20}>
            <Header />
            <Carousel />
        </Stack>
    );
};

export default HomePage;
