import { Grid } from '@mui/material';

import PlaceItem from '../PlaceItem/PlaceItem';

const HotelsList = ({ hotels }) => {
	return (
		<Grid
			container
			spacing={1}
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'flex-start',
				justifyContent: 'center',
			}}
		>
			{hotels.map((hotel) => (
				<Grid
					item
					xs={12}
					sm={6}
					md={3}
					key={hotel.id}
					sx={{ height: '100%', width: 'auto' }}
				>
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
		</Grid>
	);
};

export default HotelsList;
