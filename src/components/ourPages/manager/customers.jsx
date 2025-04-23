import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCostumersThunk } from "../../../redux/slices/costumers/GetCostumersThunk";

export const Costumer = () => {
    
    const dispatch = useDispatch();

    //const isLoadingProducts = useSelector(state => state.products.loading);
    
    const costumer = useSelector(state => state.costumers.costumersList);
    
    useEffect(() => {
        dispatch(GetCostumersThunk())
    }, []);
    return <div>


  
  { costumer.map(p =>
                    <div style={{width:100,height:100,backgroundColor:"red"}} key={p.Id}>
                        <div >{p.telephone}</div>
                        <div  >{p.address}</div>
                        <div  >{p.name}</div>
                        <div  >{p.id}</div>
                    </div>)}
 
    </div>
}