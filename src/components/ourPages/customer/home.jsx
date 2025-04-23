import { Link, Outlet, useNavigate } from "react-router-dom"
import '../ourCSS.css'
import { useEffect, useState } from "react";
import { GetCattegoryThunk } from "../../../redux/slices/cattegory/GetCattegoryThunk";
import { useDispatch, useSelector } from "react-redux";
import { GetProductsByCattegoryThunk } from "../../../redux/slices/products/GetProductsByCattegoryThunk";
import { getProductsThunk } from "../../../redux/slices/products/GetAllProductsThunk";
import { setcustCameFrom } from "../../../redux/slices/costumers/CostumerSlice";
// import { Routing } from "../../ourRouting/RoutingInCust";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export const Home = () => {
    const dispatch = useDispatch();
    //const [showLog, setshowLog] = useState(false);
    const isLoadingproducts = useSelector(state => state.products.loadingGet);

    const currentUser = useSelector(state => state.costumers.currentCust);
    // const custCameFrom = useSelector(state => state.costumers.custCameFrom);

    const catt = useSelector(state => state.cattegory.cattagoryList);
    const navigate = useNavigate();

    useEffect(() => {

        dispatch(GetCattegoryThunk())
        //  if (custCameFrom != '') {
        //     var url = custCameFrom;
        //     dispatch(setcustCameFrom(""));
        //     navigate(url)
        // }

    }, []);

    // const checkSignedIn = (p) => {
    //     if (currentUser) {
    //         navigate(`productsMain/${p.id}`);
    //     }
    //     else navigate(`/home/login`);
    // }
    const waitt = (p) => {
        dispatch(GetProductsByCattegoryThunk(p.id));
    }
    useEffect(() => {
        debugger
        if (isLoadingproducts)
            navigate('products')

    }, [isLoadingproducts])
    return <div>


        {/* <div className="header"></div> */}
        <header >
            {/* <img className="img" src="colorful.png" ></img> */}
            <img className="img" src="logo.png" ></img>
            {currentUser && currentUser.name}
            <div className="navigateLogin">
                <Tooltip title="להתחברות" placement="top-start">
                    <Link className="headerButton" to={'login'} > <img className="imgg" src="pic/userIcon.png" /></Link>
                </Tooltip>

                {currentUser && <Link className="headerButton" to={'showCart'} > <img className="imgg" src="pic/cartIcon.png" /></Link>}
                {currentUser && <Link className="headerButton" to={'showOrders'} >   <img className="imgg" src="pic/userIcon.png" /></Link>}
                {currentUser && <Link className="headerButton" to={'showLove'} >  <img className="imgg" src="pic/heart.png" /> </Link>}

                {!currentUser && <p className="headerButtonEmpty"  > </p>}
                {!currentUser && <p className="headerButtonEmpty" > </p>}
                {!currentUser && <p className="headerButtonEmpty" > </p>}

            </div>
        </header>
        <nav>
            <div className="navigateItems">  {
                catt.map(p => <span className="navigateButton" onClick={() => { waitt(p) }} key={p.Id}>

                    {/* catt.map(p => <span className="navigateButton"  key={p.Id}> */}
                    <span  >{p.name}</span></span>)}
                <span className="navigateButton" onClick={() => { dispatch(getProductsThunk()); navigate('products') }}>הצג הכל</span></div>

            {/* <button onClick={()=>setshowLog(true)}>להתחברות</button> */}
        </nav>
        <body>
            <Outlet></Outlet>


        </body>
        <footer>
            ©bl&c
        </footer>
    </div>
}