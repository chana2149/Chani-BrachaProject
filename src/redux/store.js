import { combineSlices } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/products/ProductSlice";
import { sniffimSlice } from "./slices/sniffim/sniffimSlice";
import { costumerSlice } from "./slices/costumers/CostumerSlice";
import { CattegorySlice } from "./slices/cattegory/CattegorySlice";
import { orderSlice } from "./slices/order/orderSlice";




const reducer = combineSlices(productSlice,sniffimSlice,costumerSlice,CattegorySlice,orderSlice)

export const STORE = configureStore({
    reducer: reducer
});

