import { Grid, styled } from '@mui/material';

import PlaceItem from '../PlaceItem/PlaceItem';

const StyledGrid = styled(Grid)({
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
});

const AttractionsList = ({ attractions }) => {
    return (
        <StyledGrid container spacing={1}>
            {attractions.map((attraction) => (
                <Grid item xs={12} sm={6} md={3} key={attraction.id} sx={{ height: '100%', width: 'auto' }}>
                    <PlaceItem
                        id={attraction.id}
                        image={attraction.image}
                        title={attraction.title}
                        rating={attraction.rating}
                        address={attraction.address}
                        description={attraction.description}
                    />
                </Grid>
            ))}
        </StyledGrid>
    );
};

export default AttractionsList;
