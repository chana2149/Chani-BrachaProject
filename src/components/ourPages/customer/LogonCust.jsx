import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetCostumerByIdThunk } from "../../../redux/slices/costumers/GetCostumerByIdThunk";
import { AddCustomersThunk } from "../../../redux/slices/costumers/AddCustomersThunk";
import { GetCostumersThunk } from "../../../redux/slices/costumers/GetCostumersThunk";
import { setCurrentCust, setcustCameFrom } from "../../../redux/slices/costumers/CostumerSlice";
import { GetProductsByIdThunk } from "../../../redux/slices/products/GetProductsByIdThunk";

export const LogonCust = () => {
    const navigate = useNavigate();
    const costumers = useSelector(state => state.costumers.costumersList);
    const isLoadingCust = useSelector(state => state.costumers.loading);
    const dispatch = useDispatch();
    const status = useSelector(state => state.costumers.status);
    const [newUse, setnewUse] = useState(false);
    const custCameFrom = useSelector(state => state.costumers.custCameFrom);
    const catt = useSelector(state => state.cattegory.cattagoryList);
    const currentCust = useSelector(state => state.costumers.currentCust);
    const [user, setUser] = useState({ id: currentCust.id, name: currentCust.name, address: "", telephone: "" });

    const refDialog = useRef();

    useEffect(() => {
        if (custCameFrom != "") {
            dispatch(GetProductsByIdThunk(custCameFrom.substring(28)));}
    }, [user]);
    useEffect(() => {
        refDialog.current.showModal();
    }, []);

    const check = () => {
        dispatch(AddCustomersThunk(user));
        while (isLoadingCust);
        if (custCameFrom != "") {
            navigate(custCameFrom);
        }
        else {
            navigate("/home");
        }

    }


    return <dialog className="dialoglogon" ref={refDialog}>
        <Link className="buttonx" to={'/'}> X</Link>
        {/* <label>שם</label> */}
        <div className="wrapButtons">
                <input className="buttonForm" placeholder="שם" value={user.name}  onChange={e => setUser({ ...user, name: e.target.value })} required autoFocus={true}></input>
                <input className="buttonForm" placeholder="סיסמא" value={user.id}  onChange={e => setUser({ ...user, id: e.target.value })} required type="number"></input>
                <input className="buttonForm" placeholder="כתובת" value={user.address} required onChange={e => setUser({ ...user, address: e.target.value })} ></input>
                <input className="buttonForm" placeholder="טלפון" value={user.telephone} required onChange={e => setUser({ ...user, telephone: e.target.value })} ></input>
                {/* <input type="submit" className="buttonForm submit" onSubmit={() => check()} value={"התחברות"} /> */}
                <button className="buttonForm submit" onClick={() => check()} disabled={user.telephone === "" || user.address === "" || user.name === "" || user.id === 0}>התחברות</button>

        </div>
    </dialog>
}