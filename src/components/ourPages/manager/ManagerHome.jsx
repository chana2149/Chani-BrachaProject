import { Link, Outlet } from "react-router-dom"

import '../ourCSS.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetCattegoryThunk } from "../../../redux/slices/cattegory/GetCattegoryThunk";
export const ManagerHome = () => {


    // const [user, setUser] = useState({ username: "", password: "" });

    // const refDialog = useRef();
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetCattegoryThunk());
    }, []);

    return <div>


        {/* <div className="header"></div> */}
        <header>  <img className="img" src="logo.png" ></img>
        </header>
        <nav>
            <div className="navigateItems">
                <Link className="navigateButton" to={'sniffim'} >סניפים</Link>
                <Link className="navigateButton" to={'costumer'} >לקוחות</Link>
                <Link className="navigateButton" to={'products'}>מוצרים</Link>
                {/* <Link className="navigateButton" to={'/calendar/search'}>הזמנות</Link> */}

            </div>
        </nav>
        <body>
            <Outlet></Outlet>
            {/* <Login /> */}
            {/* <Products1></Products1> */}

            {/* <RoutingInManager/> */}
        </body>
        <footer>
            ©bl&c
        </footer>
    </div>
}