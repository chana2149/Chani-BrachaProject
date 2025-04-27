import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useRef, useState } from 'react';
import { getProductsThunk } from '../../../redux/slices/products/GetAllProductsThunk';
import { GetProductsByIdThunk } from '../../../redux/slices/products/GetProductsByIdThunk';
import { GetAllOrdersByIdCostumerThunk } from '../../../redux/slices/order/GetAllOrdersByIdCostumerThunk';
import { AddOrderThunk } from '../../../redux/slices/order/AddOrderThunk';
import { AddFavorateThunk } from '../../../redux/slices/costumers/AddFavorateThunk';
import { DeleteFavorateThunk } from '../../../redux/slices/costumers/DeleteFavorateThunk';
import { addCurrentCustCart, deleteAllCurrentCustCart, deleteCurrentCustCart } from '../../../redux/slices/costumers/CostumerSlice';
import { GetCostumerByIdThunk } from '../../../redux/slices/costumers/GetCostumerByIdThunk';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const customer = useSelector(state => state.costumers.currentCust);
    const [sum, setSum] = useState(0);
    const [prod, setProd] = useState(null);
    const favorate = useSelector(state => state.costumers.currentCustFaverate);
    const refDialog = useRef();
    const orderLoading = useSelector(state => state.order.loading);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.costumers.currentCustCart);
    const snifOrder = [];
    const [order, setOrder] = useState([]);
    const currentCust = useSelector(state => state.costumers.currentCust);
    const isEmpty = useSelector(state => state.costumers.isEmpty);

    const [haert, setHaert] = useState('🤍');
    const [pay, setPay] = useState(false);
    const [finish, setFinish] = useState(false);
    const [paying, setPaying] = useState(false);


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
    useEffect(() => {
        dispatch(GetCostumerByIdThunk(currentCust.id))
        if (prod !== null) {
            setHaert('🤍')
            setHaertCheck(prod.id);
            refDialog.current.showModal();
        }
    }, [prod]);
    useEffect(() => {
        if (pay === true) {

            refDialog.current.showModal();
        }
    }, [pay]);
    useEffect(() => {

    }, [cart]);

    const setHaertCheck = (id) => {
        favorate.map((f) => {
            if (f.id === id) {
                setHaert('💖')
            }
        })
    }
    // const aaa = (id) => {
    //     favorate.map((f) => {
    //         if (f.id === id) {
    //             setHaert('💖')
    //         }
    //     })
    // }
    const exsistsSnif = (idSnif) => {
        for (let index = 0; index < snifOrder.length; index++) {
            if (snifOrder[index] === idSnif)
                return true

        }

        return false
    }
    const doOrder = () => {
        
        for (let index = 0; index < cart.length; index++) {
            if (!exsistsSnif(cart[index].idSnif)) {
                const snif = cart[index].idSnif;
                snifOrder.push(snif)
                const arr = cart.filter(c => c.idSnif == snif).map(cc => { return { idOrder: 0, idProductSpecific: cc.id, nothing: '' } });
                order.push({ idOrder: 0, idSnif: snif, idCostumer: customer.id, orderDetails: arr })


                // 
                // while(orderLoading);
            }
        }
        dispatch(AddOrderThunk(order));
        setPaying(true)
        setTimeout(() => {
            setPaying(false);
            setFinish(true);
        }, 3000);
        dispatch(deleteAllCurrentCustCart());
        // cart.map(ca => {
        //     if (!exsistsSnif(ca.idSnif)) {
        //         const snif = ca.idSnif;
        //         snifOrder.push(snif)
        //         const arr = cart.filter(c => c.idSnif == snif).map(cc => { return { idOrder: 0, idProductSpecific: cc.id, nothing: '' } });
        //         setOrder({ ...order, orderDetails: arr, idSnif: snif });

        //     }
        // })
    }
    // useEffect(() => {
    //     if (order.orderDetails.length > 0) {
    //         dispatch(AddOrderThunk(order))
    //         while (orderLoading);
    //     }
    // }, [order])
    return <div>
        {cart != [] && cart.map(p =>

            <div style={{ width: 100, height: 100, backgroundColor: "red" }} key={p.id} onClick={() => { setProd(p) }}>
                <div className="product-text">{p.available}</div>
                <div className="product-text">{p.price}</div>
                <div className="product-text">{p.id} {p.idProduct}</div>
                <div className="product-text">{p.idSnif}</div>

                {/* { favorate.map(f => 
                        if (f.id === p.id) {
                           { <div  className="product-text">💖</div>}
                        }
                    )}  */}


            </div>
        )
        }
        {!isEmpty && <div>הסל ריק</div>}


      {isEmpty&&  <button onClick={() => { setPay(true); }}>להמשך הזמנה</button>}
      {isEmpty&&  <div>סה"כ:{sum}</div>}
        {prod && <dialog ref={refDialog}>

            <div className="buttonx" onClick={() => { setProd(null) }}> X</div>
            <div key={prod.id} >
                <div className="product-text">{prod.available}</div>
                <div className="product-text">{prod.price}</div>
                <div className="product-text">{prod.id} {prod.idProduct}</div>
                <div className="product-text">{prod.dayTaken}</div>
                <div className="product-text">{prod.idSnif}</div>
                <button onClick={() => { dispatch(deleteCurrentCustCart(prod)); }}>הסרה מהסל</button>

                <button onClick={() => { checkFavorate(prod) }}>{haert}</button>
            </div>
        </dialog>}
        {pay && <dialog className="dialog" ref={refDialog}>
            <button className="buttonx" onClick={() => { setPay(false) }}>X</button>
            {/* <Link className="buttonx" to={'/'}> X</Link> */}
            {/* <label>שם</label> */}
            <div className="wrapButtons">
                <form>
                    <input className="buttonForm" placeholder="מספר אשראי" required autoFocus={true}></input>

                    <input className="buttonForm" placeholder=" תוקף " type='date' required ></input>

                    <input className="buttonForm" placeholder="סיסמא 3 ספרות" required ></input>

                    <input className="buttonForm submit" onClick={() => { setPay(false); doOrder() }} type='submit' value={'לסיום הזמנה'} />
                </form>
            </div>

      
        </dialog>}
        {paying && <div>loading...</div>}
        {finish && <div>מזל טוב</div>}

    </div>


}