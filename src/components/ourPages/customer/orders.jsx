import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { getProductsThunk } from '../../../redux/slices/products/GetAllProductsThunk';
import { GetProductsByIdThunk } from '../../../redux/slices/products/GetProductsByIdThunk';
import { GetAllOrdersByIdCostumerThunk } from '../../../redux/slices/order/GetAllOrdersByIdCostumerThunk';

export const Orders = (props) => {
    const customer = useSelector(state => state.costumers.currentCust);

    const dispatch = useDispatch();
    const [flag, setFlag] = useState(true);
    const orders = useSelector(state => state.order.ordersList);


    useEffect(() => {

        dispatch(GetAllOrdersByIdCostumerThunk(customer.id))
    }, []);
    return <div>
        {orders.map(p =>
            <div style={{ width: 100, height: 100, backgroundColor: "red" }} key={p.idOrder} >
                <div >{p.idOrder}</div>
                <div  >{p.idSnif}</div>
                {/* <div  >{customer.idCostumer}</div> */}
                <div style={{ width: 100, height: 100, backgroundColor: "blue" }} >{p.orderDetails.map(p1 => <div >{p1.idProductSpecific}</div>
                )}</div>

            </div>)}


    </div>


}