import { Grid, styled } from '@mui/material';

import PlaceItem from '../PlaceItem/PlaceItem';

const StyledGrid = styled(Grid)({
    width: '90vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiGrid-item': {
        paddingLeft: '1rem'
    }
});

const ItemsList = ({ items }) => {
    return (
        <StyledGrid container spacing={1}>
            {items.map((item, i) => (
                <Grid item md={4} key={i}>
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
