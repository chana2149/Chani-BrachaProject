import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProductsByIdThunk } from "../../../redux/slices/products/GetProductsByIdThunk";
import { getProductsThunk } from "../../../redux/slices/products/GetAllProductsThunk";
import { addCurrentCustCart, addCurrentCustFaverate } from "../../../redux/slices/costumers/CostumerSlice";
import { AddFavorateThunk } from "../../../redux/slices/costumers/AddFavorateThunk";
import { DeleteFavorateThunk } from "../../../redux/slices/costumers/DeleteFavorateThunk";
import { GetCostumerByIdThunk } from "../../../redux/slices/costumers/GetCostumerByIdThunk";


export const ProductsMain = () => {
    const currentCust = useSelector(state => state.costumers.currentCust);

    const dispatch = useDispatch();
    const [prod, setProd] = useState(null);
    const [haert, setHaert] = useState('🤍');
    const favorate = useSelector(state => state.costumers.currentCustFaverate);
    const product = useSelector(state => state.products.product);
    const refDialog = useRef();
    useEffect(() => {
        if (currentCust != {}) {
            dispatch(GetCostumerByIdThunk(currentCust.id))
            // dispatch(getProductsThunk())
        }


    }, []);
    useEffect(() => {
        if (currentCust != {}) {
            dispatch(GetCostumerByIdThunk(currentCust.id))
        }
        if (prod !== null) {
            setHaert('🤍')
            refDialog.current.showModal();
            setHaertCheck(prod.id);
        }
    }, [prod]);
    const setHaertCheck = (id) => {
        favorate?.map((f) => {
            if (f.id === id) {
                setHaert('💖')
            }
        })
    }
    const addToCart = (prod) => {
        if (prod.available.toString() === 'true') {
            dispatch(addCurrentCustCart(prod));
        }
    }
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
    return <>{<div>
        <div> <input  placeholder={'חיפוש מוצר'} />
            <input  placeholder={'חיפוש מוצר'} />
        </div>
        <div className="products-container">
            {/* <div>{product.productsMains.IdProductNavigation.name}</div> */}
            {product.productsMains?.map(p =>
                <div className="product-main-card" key={p.id} onClick={() => { setProd(p) }}>
                    {p.available.toString() === 'false' && <div className="product-text"> המוצר חוזר ב{new Date(p.dayTaken).toLocaleDateString()}</div>}
                    <div className="product-text">{p.price}</div>
                    <div className="product-text">{p.id} {p.idProduct}</div>
                    <div className="product-text">{p.idProductNavigation.name}</div>
                    <div className="product-text">{p.idSnifNavigation.address}</div>
                    <div className="product-text">{p.idSnifNavigation.telephone}</div>

                    {/* {favorate.map(f => {
                        if (f.id === p.id) {
                            <div  className="product-text">💖</div>

                        }
                    })} */}
                </div>
            )}
        </div>

        {prod && <dialog ref={refDialog}>

            <div className="buttonx" onClick={() => { setProd(null) }}> X</div>
            <div key={prod.id} >
                <div className="product-text">{prod.available.toString()}</div>
                <div className="product-text">{prod.price}</div>
                {/* <div className="product-text">{prod.id} {prod.idProduct}</div> */}
                <div className="product-text">{prod.dayTaken}</div>
                <div className="product-text">{prod.idSnif}</div>

                <button onClick={() => { addToCart(prod) }}>הוספה לסל</button>
                <button onClick={() => { checkFavorate(prod) }}>{haert}</button>
            </div>
        </dialog>}

    </div>

    }</>
}