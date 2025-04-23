
import { deleteAllCurrentCustCart } from "../costumers/CostumerSlice";
import { AddOrderThunk } from "./AddOrderThunk";
import { GetAllOrdersByIdCostumerThunk } from "./GetAllOrdersByIdCostumerThunk";
import { createSlice } from "@reduxjs/toolkit";




const INITIAL_STATE = {
    ordersList: [],
    loading: false,
    error: 0
}

export const orderSlice = createSlice({
    name: 'order',
    initialState: INITIAL_STATE,
    reducers: {
        // logoutevents: (state, action) => {
        //     state.productsList = [];
        //     state.token = 0;
        //     state.loading = false;
        //     state.error = 0;

        // }


    },

    extraReducers: (builder) => {
        //ordersList
        builder.addCase(GetAllOrdersByIdCostumerThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(GetAllOrdersByIdCostumerThunk.fulfilled, (state, action) => {
            state.ordersList = action.payload;
            state.loading = false;
        });
        builder.addCase(GetAllOrdersByIdCostumerThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });
        //add
        builder.addCase(AddOrderThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(AddOrderThunk.fulfilled, (state, action) => {
            state.ordersList = action.payload;
            state.loading = false;
            debugger
            deleteAllCurrentCustCart();
        });
        builder.addCase(AddOrderThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });


    }
})
// export const { logoutevents} = productSlice.actions;
