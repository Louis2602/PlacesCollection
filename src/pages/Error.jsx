import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <Box sx={{ marginTop: '5rem' }} className="not-found">
            <Link to="/" className="link-home">
                <img src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png" alt="not-found" />
                <Typography sx={{ marginTop: '1rem' }} fontSize={30} textAlign="center" color="primary" fontWeight="bold">
                    Go Home
                </Typography>
            </Link>
        </Box>
    );
};

export default Error;
