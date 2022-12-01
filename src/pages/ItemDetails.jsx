import { useParams } from 'react-router-dom';

import PlaceItemDetails from '../components/PlacesList/PlaceItemDetails/PlaceItemDetails';
import { useGetCollectionDetailsQuery } from '../redux/services/fetchAPI';

const ItemDetails = () => {
    const { collection, id } = useParams();
    const { data, isFetching } = useGetCollectionDetailsQuery({ collection, id });

    if (isFetching) return <div className="loader" />;

    return (
        <section>
            <h1>{data.title}</h1>
            <PlaceItemDetails
                id={id}
                address={data.address}
                description={data.description}
                rating={data.rating}
                image={data.image}
                title={data.title}
                type={data.type}
            />
        </section>
    );
};

export default ItemDetails;
