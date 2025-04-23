

import { createSlice } from "@reduxjs/toolkit";

import { GetCattegoryThunk } from "./GetCattegoryThunk";



const INITIAL_STATE = {
    cattagoryList: [],
    //product,
    token: 0,
    loading: false,
    error: 0
}

export const CattegorySlice = createSlice({
    name: 'cattegory',
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
        //getcattagory
        builder.addCase(GetCattegoryThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(GetCattegoryThunk.fulfilled, (state, action) => {
            state.cattagoryList = action.payload;
            state.loading = false;
        });
        builder.addCase(GetCattegoryThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });
        
    }
})
// export const { logoutevents} = productSlice.actions;
