import { Grid, styled } from '@mui/material';

import PlaceItem from '../PlaceItem/PlaceItem';

const StyledGrid = styled(Grid)({
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
});

const HotelsList = ({ hotels }) => {
    return (
        <StyledGrid container spacing={1}>
            {hotels.map((hotel) => (
                <Grid item xs={12} sm={6} md={3} key={hotel.id} sx={{ height: '100%', width: 'auto' }}>
                    <PlaceItem
                        id={hotel.id}
                        image={hotel.image}
                        title={hotel.title}
                        rating={hotel.rating}
                        address={hotel.address}
                        description={hotel.description}
                    />
                </Grid>
            ))}
        </StyledGrid>
    );
};

export default HotelsList;
