
import { useParams } from 'react-router-dom';

function GetProductId(){

    const {productId} = useParams();

    return productId;
}

export default GetProductId;