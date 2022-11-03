import { Grid } from '@mui/material';

import PlaceItem from '../PlaceItem/PlaceItem';

const FavoritesList = ({ favorites }) => {
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
            {favorites.map((fav) => (
                <Grid item xs={12} sm={6} md={3} key={fav.id} sx={{ height: '100%', width: 'auto' }}>
                    <PlaceItem
                        id={fav.id}
                        image={fav.image}
                        title={fav.title}
                        rating={fav.rating}
                        address={fav.address}
                        description={fav.description}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default FavoritesList;
