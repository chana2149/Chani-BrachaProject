import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { AddProductsThunk } from '../../../redux/slices/products/AddProductsThunk';
import { getProductsThunk } from '../../../redux/slices/products/GetAllProductsThunk';
import { EditProductThunk } from '../../../redux/slices/products/EditProductThunk';
import { AddProductsMainThunk } from '../../../redux/slices/products/AddProductsMainThunk';
import { GetSniffimThunk } from '../../../redux/slices/sniffim/GetSniffimThunk';
import { GetProductsByIdThunk } from '../../../redux/slices/products/GetProductsByIdThunk';
import { DeleteProdMainThunk } from '../../../redux/slices/products/DeleteProdMainThunk';
import { GetCattegoryThunk } from '../../../redux/slices/cattegory/GetCattegoryThunk';

export const Products1 = () => {
    const productLoading = useSelector(state => state.products.loading);

    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const productsMain = useSelector(state => state.products.product);
    const catt = useSelector(state => state.cattegory.cattagoryList);
    // const [clickOnSnif, setClickOnSnif] = useState(false);
    const [snif, setSnif] = useState({});
    const products = useSelector(state => state.products.productsList);
    const [index1, setIndex1] = useState(-1);
    const [prod, setProd] = useState({ id: 0, name: "", url: "", details: "", idCattegory: null, idCattegoryNavigation: {}, productsMains: [] });
    const [prodMain, setProdMain] = useState({ idProduct: 0, dayTaken: "2025-03-26T07:39:53.337Z", idSnif: 0, id: 0, available: true, price: 0, canBeUsed: true });
    const sniffim = useSelector(state => state.sniffim.sniffimList);

    const refDialog = useRef();


    const f = (p, e) => {
        console.log(e, p)
    }
    const saveNewMain = () => {
       // setTimeout(() => {
            dispatch(AddProductsMainThunk(prodMain));
       // }, 1000);

    }
    const save = () => {
        if (index1 === -1) {
            dispatch(AddProductsThunk(prod));
        }
        else {
            dispatch(EditProductThunk(prod))
        }
        // dispatch(getProductsThunk());
    }
    useEffect(() => {
        dispatch(getProductsThunk());


    }, []);

    // useEffect(() => {
    //     // setTimeout(() => {
    //         debugger
    //        if (showDelete)
    //             dispatch(getProductsThunk());

    //     // }, 1000);

    // }, [showDelete]);

    useEffect(() => {
        if (showEdit || showAdd || showDelete)
            refDialog.current.showModal();

    }, [showEdit, showAdd, showDelete]);
    //const isLoadingProducts = useSelector(state => state.products.loading);

    const addItem = (p) => {
        setShowAdd(true); 
        setProd(p); 
        dispatch(GetSniffimThunk());
    }
    const deleteItem = (p) => {
        setProd(p); 
        dispatch(GetSniffimThunk()); 
        setShowDelete(true);
    }


    return <div className="products-container">
        <button className="wrapButtons" onClick={() => { setShowEdit(true); setProd({ idProduct: 0, dayTaken: null, idSnif: 0, id: 0, available: true, price: 0 }) }}>להוספת מוצר</button>
        {!productLoading && products.map((p, index) =>
            <div className="product-card" onClick={() => { setIndex1(index); setProd(p); }} key={p.id}>
                <div onClick={() => { setShowEdit(true); }} className="product-details">
                    {/* <div className="product-text">{p.idCattegoryNavigation.name}</div> */}
                    <div className="product-text">{p.name}</div>
                    <div className="product-text">{p.details}</div>

                    <div className="product-text">{p.id}</div> </div>
                <button onClick={() => { addItem(p) }}>להוספת המוצר לסניף נוסף</button>
                <button onClick={() => { deleteItem(p) }}>למחיקת מוצר מסניף </button>

            </div>
        )}
        {productLoading && <div>productLoading.......</div>}
        {showEdit && <dialog className="dialog" ref={refDialog}>
            <div className="buttonx" onClick={() => { setShowEdit(false); }}>X</div>
            <div className="wrapButtons">
                <input className="buttonForm" value={prod.name} onChange={e => { setProd({ ...prod, name: e.target.value }); }} placeholder="name" autoFocus />
                <input className="buttonForm" value={prod.url} onChange={e => { setProd({ ...prod, url: e.target.value }); }} placeholder="url" autoFocus />
                <input className="buttonForm" value={prod.details} onChange={e => { setProd({ ...prod, details: e.target.value }); }} placeholder="details" autoFocus />
                <select className="buttonForm" placeholder="idCattegory" onChange={(e) => { setProd({ ...prod, idCattegory: e.target.value }); }}>

                    {catt.map(c => <option  >{c.name}</option>)}


                </select>
                {/* <input className="buttonForm" value={prod.idCattegory} onChange={e => { setProd({ ...prod, idCattegory: e.target.value }); }} placeholder="idCattegory" /> */}
                <button className="buttonForm submit" onClick={() => { setShowEdit(false); save(); }}  >אישור</button></div>
        </dialog>
        }
        {showAdd && <dialog className="dialog" ref={refDialog}>
            <div className="wrapButtons">
                <div className="buttonx" onClick={() => { setShowAdd(false); }}>X</div>
                {sniffim.map((s, index) =>
                    <div className="snif" onClick={() => { setSnif(s); setProdMain({ ...prodMain, idSnif: snif.id, idProduct: prod.id }); }} key={s.id}>
                        <div  >{s.name}</div>
                        {s.id === snif.id && <>
                            <input className="buttonForm" disabled={s.id !== snif.id} onChange={e => { setProdMain({ ...prodMain, price: parseInt(e.target.value) }); }} placeholder="price" type="number" />
                            <button className="buttonForm submit" disabled={s.id != snif.id} onClick={() => { setSnif({}); saveNewMain(); }}  >אישור</button>
                        </>}
                    </div>)}
            </div>
        </dialog>}


        {showDelete && <dialog className="dialog" ref={refDialog}>
            <div className="wrapButtons">
                <div className="buttonx" onClick={() => { setShowDelete(false); }}>X</div>

                {sniffim.map((s, index) =>
                    <div className="snif" onClick={() => { setSnif(s); }} key={s.id}>
                        <div  >{s.name}</div>

                        {s.id === snif.id && <>
                            <select onChange={(e) => { setProdMain({ ...prodMain, id: e.target.value }); f(prodMain.id, e.target.value) }}>
                                <optgroup label='hhhhhh'>
                                    <option  ></option>
                                    {prod.productsMains?.map(c => c.idSnif === s.id && c.available.toString() === "true" && c.canBeUsed.toString() === "true" && <option  >{c.id}</option>)}
                                </optgroup>
                            </select>
                            <button onClick={() => dispatch(DeleteProdMainThunk(prodMain.id))}>delete</button>
                        </>}

                    </div>

                )}
            </div>
        </dialog>}
    </div>
}