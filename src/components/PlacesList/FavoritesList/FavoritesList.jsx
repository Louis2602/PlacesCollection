import { Grid, styled } from '@mui/material';

import PlaceItem from '../PlaceItem/PlaceItem';

const StyledGrid = styled(Grid)({
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
});

const FavoritesList = ({ favorites }) => {
    return (
        <StyledGrid container spacing={1}>
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
        </StyledGrid>
    );
};

export default FavoritesList;
