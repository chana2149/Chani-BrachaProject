import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getProductsThunk } from '../../../redux/slices/products/GetAllProductsThunk';
import { GetProductsByIdThunk } from '../../../redux/slices/products/GetProductsByIdThunk';
import { useNavigate } from 'react-router-dom';
import { setcustCameFrom } from '../../../redux/slices/costumers/CostumerSlice';

export const Products = () => {
    const currentCust = useSelector(state => state.costumers.currentCust);
    const [prod, setProd] = useState(null);
    const custCameFrom = useSelector(state => state.costumers.custCameFrom);

    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    //const isLoadingProducts = useSelector(state => state.products.loading);
    const refDialog = useRef();
    const products = useSelector(state => state.products.productsList);
    const product = useSelector(state => state.products.product);
    const navigate = useNavigate();
    const checkSignedIn = (p) => {
        if (currentCust) {
            dispatch(GetProductsByIdThunk(prod.id));
            navigate(`productsMain/${p.id}`);
        }
        else {
            dispatch(setcustCameFrom(`/home/products/productsMain/${p.id}`))
            navigate(`/home/login`);
        }
    }
    useEffect(() => {
        if (prod !== null) {
            refDialog.current.showModal();
            
        }
    }, [prod]);

    // useEffect(() => {

    //     dispatch(getProductsThunk())
    // }, []);
    return <div className="products-container">
        {/* <input type='text' onChange={e => setSearch(e.target.value)} /> */}
        {/* {products.find(e =>  e.name === search  )?.map(p =>
            <div className="product-card" onClick={() => { dispatch(GetProductsByIdThunk(p.id)); navigate(`productsMain/${p.id}`); }} key={p.id}>
                <div className="product-details">
                    <div className="product-text">{p.details}</div>
                    <div className="product-text">{p.idCattegory}</div>
                    <div className="product-text">{p.name}</div>
                    <div className="product-text">{p.id}</div> </div>
            </div>)} */}

        {products.map(p =>
            <div className="product-card" onClick={() => { setProd(p) }} key={p.id}>
                <div className="product-details">
                    <img className="img" src={`/pic/Products/${p.url}.png`} alt={`${p.url}`}></img>
                    <div className="product-text">{p.idCattegoryNavigation.name}</div>
                    <div className="product-text">{p.name}</div>
                    <div className="product-text">{p.details}</div>
                    <div className="product-text">{p.id}</div> </div>
                    
            </div>
        )}
        {prod && <dialog ref={refDialog}>
            <div className="buttonx" onClick={() => { setProd(null) }}> X</div>
            <div className="product-card" key={prod.id}>
                <div className="product-details">
                    <div className="product-text">{prod.idCattegory}</div>
                    <div className="product-text">{prod.name}</div>
                    <div className="product-text">{prod.details}</div>
                    <div className="product-text">{prod.id}</div>
                    <button onClick={() => { checkSignedIn(prod); }}>לפירוט מחירים וסניפים</button>
                </div>
            </div>
        </dialog>}


    </div>


}