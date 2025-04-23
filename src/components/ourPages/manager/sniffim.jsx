import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSniffimThunk } from "../../../redux/slices/sniffim/GetSniffimThunk";
import { EditSniffimThunk } from "../../../redux/slices/sniffim/EditSniffimThunk";
import { sniffimSlice } from "../../../redux/slices/sniffim/sniffimSlice";
import { addSniffimThunk } from "../../../redux/slices/sniffim/AddSniffimThunk";

export const Sniffim = () => {
    const dispatch = useDispatch();
    const [index1, setIndex1] = useState(-1);
    const sniffim = useSelector(state => state.sniffim.sniffimList);
    const [snif, setSnif] = useState({ id: -1, name: "", address: "", telephone: "",productsMains:[] });
    const [showEdit, setShowEdit] = useState(false);
    const refDialog = useRef();
    const isLoading = useSelector(state => state.sniffim.loading);

    const save = () => {

        if (index1 === -1) {
            dispatch(addSniffimThunk(snif))
        }
        else { dispatch(EditSniffimThunk(snif)) }
        if(!isLoading)
        dispatch(GetSniffimThunk());
    }

    useEffect(() => {
        if (showEdit)
            refDialog.current.showModal();
        dispatch(GetSniffimThunk());
    }, []);
    useEffect(() => {
        if (showEdit)
            refDialog.current.showModal();
    }, [showEdit]);
    return <div>

        <button onClick={() => { setShowEdit(true) }}>הוספת סניף</button>
        {!isLoading && sniffim.map((p, index) =>
            <div className="snif" onClick={() => { setShowEdit(true); setIndex1(index); setSnif(sniffim[index]) }} style={{ width: 100, height: 100, backgroundColor: "red" }} key={p.Id}>
                <div  >{p.telephone}</div>
                <div  >{p.name}</div>
                <div  >{p.address}</div>
            </div>)
        }
        {isLoading &&<div>tyrw</div>}



        {showEdit && <dialog className="dialog" ref={refDialog}>
            <div onClick={() => { setShowEdit(false); }} className="buttonx">X</div>
            <div className="wrapButtons">
                <input className="buttonForm" value={snif.name} onChange={e => { setSnif({ ...snif, name: e.target.value }); }} placeholder="name" autoFocus />
                <input className="buttonForm" value={snif.telephone} onChange={e => { setSnif({ ...snif, telephone: e.target.value }); }} placeholder="telephone" />
                <input className="buttonForm" value={snif.address} onChange={e => { setSnif({ ...snif, address: e.target.value }); }} placeholder="address" />
                <button className="buttonForm submit" onClick={() => { save(); setShowEdit(false); }} >אישור</button>
            </div>
        </dialog>
        }


    </div>
}