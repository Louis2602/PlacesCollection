import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ItemsList from '../components/PlacesList/ItemsList/ItemsList';
import {
	useGetAllCollectionsQuery,
	useGetFavoritesQuery,
} from '../redux/services/fetchAPI';

const Favorites = ({ favRender, setfavRender }) => {
	const username = useSelector((state) => state.counter.username);
	const { data: favData, isFetching: favFetch } = useGetFavoritesQuery(
		username || '',
		{
			pollingInterval: `${favRender ? 1000 : false}`,
		}
	);
	const { data: placesData, isFetching: placeFetch } =
		useGetAllCollectionsQuery({
			pollingInterval: `${favRender ? 1000 : false}`,
		});

	useEffect(() => {
		setfavRender(false);
	}, [favFetch, placeFetch, setfavRender]);

	const itemList = [];

	for (const i in placesData) {
		for (const j in placesData[i]) {
			for (const k in favData) {
				if (k === j) {
					const item = {
						id: k,
						...placesData[i][j],
					};
					itemList.push(item);
				}
			}
		}
	}

	if (favFetch || placeFetch) return <div className='loader' />;

	return (
		<section>
			<h1>
				{username
					? `${username}'s Favorites`
					: 'Please sign in to access favorites'}
			</h1>
			{itemList.length === 0 ? (
				<Typography textAlign='center'>
					There is no places stored yet! Add some more
				</Typography>
			) : (
				<ItemsList items={itemList} />
			)}
		</section>
	);
};

export default Favorites;
