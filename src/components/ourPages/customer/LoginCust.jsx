import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetCostumerByIdThunk } from "../../../redux/slices/costumers/GetCostumerByIdThunk";
import { AddCustomersThunk } from "../../../redux/slices/costumers/AddCustomersThunk";
import { GetCostumersThunk } from "../../../redux/slices/costumers/GetCostumersThunk";
import { setCurrentCust, setcustCameFrom } from "../../../redux/slices/costumers/CostumerSlice";
import { getProductsThunk } from "../../../redux/slices/products/GetAllProductsThunk";
import { GetProductsByIdThunk } from "../../../redux/slices/products/GetProductsByIdThunk";

export const LoginCust = () => {
    const navigate = useNavigate();
    const costumers = useSelector(state => state.costumers.costumersList);
    const isLoadingCust = useSelector(state => state.costumers.loading);
    const dispatch = useDispatch();
    const status = useSelector(state => state.costumers.status);
    const [user, setUser] = useState({ id: "", name: "", address: "", telephone: "" });
    const [newUse, setnewUse] = useState(false);
    const custCameFrom = useSelector(state => state.costumers.custCameFrom);
    const catt = useSelector(state => state.cattegory.cattagoryList);

    const refDialog = useRef();


    useEffect(() => {
        refDialog.current.showModal();
        if (catt.length > 0) dispatch(GetCostumersThunk());
    }, []);

    const check = () => {
        var exists = 0;

        // eslint-disable-next-line no-unused-vars
        var flag = false;
        dispatch(setCurrentCust(user));
        costumers.map((c) => {
            // if (c.id === user.id && c.name != user.name) {
            //     exists = 4;
            // }
            if (c.id === user.id) {
                exists = 5;
                flag = true;
                // navigate("/home");
            }
        })
        if (flag)
            navigate(`/home`);
        if (exists === 0) {
            alert()
        }
        if (custCameFrom !== "") {
            //alert(custCameFrom.substring(28))
            dispatch(GetProductsByIdThunk(custCameFrom.substring(28)));
            navigate(custCameFrom);
        }


        //dispatch(AddCustomersThunk(user))




        //dispatch(GetCostumerByIdThunk(user.id))
        // while (isLoadingCust);
        // navigate("/home")
        //  }

        // setnewUse(true);
        //  }
        // else {
        //     if (custCameFrom != "") {
        //         navigate(custCameFrom);
        //     }
        // else{


        // }
        // }
        // if(exists===4){
        //     alert()
        // }
        // else {
        // while (isLoadingCust);
        // if (custCameFrom != '') {
        //     var url = custCameFrom;
        //     dispatch(setcustCameFrom(""));
        //     navigate(url)
        // }
        // else {
        //     navigate("/home")
        // }
        // }

    }


    return <dialog className="dialog" ref={refDialog}>
        <Link className="buttonx" to={'/'}> X</Link>
        {/* <label>שם</label> */}
        <div className="wrapButtons">
            <input className="buttonForm" placeholder="שם" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} ></input>
            {/* <label>סיסמא</label> */}
            <input className="buttonForm" placeholder="סיסמא" value={user.id} onChange={e => setUser({ ...user, id: e.target.value })} type="number"></input>
            {/* <label>כתובת</label> */}
            <button onClick={() => { dispatch(setCurrentCust(user)); navigate("/home/logon") }}>new user</button>
            {/* <input type="submit" className="buttonForm submit" onSubmit={() => check()} value={"התחברות"}/> */}
            <button className="buttonForm submit" onClick={() => check()} disabled={user.name === "" || user.id === 0}>התחברות</button>
        </div>
    </dialog>
}