import { Grid, styled } from '@mui/material';

import PlaceItem from '../PlaceItem/PlaceItem';

const StyledGrid = styled(Grid)({
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
});

const ItemsList = ({ items }) => {
    return (
        <StyledGrid container spacing={1}>
            {items.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id} sx={{ height: '100%', width: 'auto' }}>
                    <PlaceItem
                        id={item.id}
                        image={item.image}
                        title={item.title}
                        rating={item.rating}
                        address={item.address}
                        description={item.description}
                        type={item.type}
                    />
                </Grid>
            ))}
        </StyledGrid>
    );
};

export default ItemsList;
