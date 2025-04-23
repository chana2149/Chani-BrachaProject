import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useRef, useState } from 'react';
import { getProductsThunk } from '../../../redux/slices/products/GetAllProductsThunk';
import { GetProductsByIdThunk } from '../../../redux/slices/products/GetProductsByIdThunk';
import { GetAllOrdersByIdCostumerThunk } from '../../../redux/slices/order/GetAllOrdersByIdCostumerThunk';
import { GetCostumerByIdThunk } from '../../../redux/slices/costumers/GetCostumerByIdThunk';
import { GetCostumersThunk } from '../../../redux/slices/costumers/GetCostumersThunk';
import { addCurrentCustCart, deleteCurrentCustCart } from '../../../redux/slices/costumers/CostumerSlice';
import { DeleteFavorateThunk } from '../../../redux/slices/costumers/DeleteFavorateThunk';
import { AddFavorateThunk } from '../../../redux/slices/costumers/AddFavorateThunk';

export const Favorate = () => {
    const currentCust = useSelector(state => state.costumers.currentCust);
    const [prod, setProd] = useState(null);
    const refDialog = useRef();

    const dispatch = useDispatch();
    const favorate = useSelector(state => state.costumers.currentCustFaverate);
    const checkFavorate = (prod) => {
        if (haert === '🤍') {
            dispatch(AddFavorateThunk({ customerid: currentCust.id, prodid: prod.id }));
            setHaert('💖');
        }
        else {
            dispatch(DeleteFavorateThunk({ customerid: currentCust.id, prodid: prod.id }));
            setHaert('🤍');
        }
    }
    const [haert, setHaert] = useState('🤍');

    useEffect(() => {
        dispatch(GetCostumerByIdThunk(currentCust.id))
    }, []);
    const addToCart = (prod) => {
        if (prod.available.toString() === 'true') {
            dispatch(addCurrentCustCart(prod));
        }
    }
    const setHaertCheck = (id) => {
        favorate.map((f) => {
            if (f.id === id) {
                setHaert('💖')
            }
        })
    }
    useEffect(() => {
        dispatch(GetCostumerByIdThunk(currentCust.id))
        if (prod !== null) {


            setHaert('🤍')
            setHaertCheck(prod.id);
            refDialog.current.showModal();
        }

    }, [prod]);

    return <div>
        {favorate.map(p =>

            <div style={{ width: 100, height: 100, backgroundColor: "red" }} key={p.id} onClick={()=>setProd(p)}>
                <div className="product-text">{p.price}</div>
                <div className="product-text">{p.id} {p.idProduct}</div>
                <div className="product-text">{p.idSnif}</div>
                <div className="product-text">{p.available.toString()}</div>
                {/* <button onClick={() => { addToCart(prod); }}>הוספה לסל</button> */}

            </div>

        )}
        {prod && <dialog ref={refDialog}>

            <div className="buttonx" onClick={() => { setProd(null) }}> X</div>
            <div key={prod.id} >
                <div className="product-text">{prod.available}</div>
                <div className="product-text">{prod.price}</div>
                <div className="product-text">{prod.id} {prod.idProduct}</div>
                <div className="product-text">{prod.dayTaken}</div>
                <div className="product-text">{prod.idSnif}</div>
               
                <button onClick={() => { addToCart(prod); }}>הוספה לסל</button>

                <button onClick={() => { checkFavorate(prod) }}>{haert}</button>
            </div>
        </dialog>}

    </div>


}