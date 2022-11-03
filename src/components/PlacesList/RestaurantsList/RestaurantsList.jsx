import { Grid } from '@mui/material';

import PlaceItem from '../PlaceItem/PlaceItem';

const RestaurantsList = ({ restaurants }) => {
    return (
        <Grid
            container
            spacing={1}
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center'
            }}>
            {restaurants.map((restaurant) => (
                <Grid item xs={12} sm={6} md={3} key={restaurant.id} sx={{ height: '100%', width: 'auto' }}>
                    <PlaceItem
                        id={restaurant.id}
                        image={restaurant.image}
                        title={restaurant.title}
                        rating={restaurant.rating}
                        address={restaurant.address}
                        description={restaurant.description}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default RestaurantsList;
