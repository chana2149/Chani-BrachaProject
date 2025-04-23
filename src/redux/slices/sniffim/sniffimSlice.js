
import { createSlice } from "@reduxjs/toolkit";
import { GetSniffimThunk } from "./GetSniffimThunk";
import { EditSniffimThunk } from "./EditSniffimThunk";
import { addSniffimThunk } from "./AddSniffimThunk";



const INITIAL_STATE = {
    sniffimList: [],
    token: 0,
    loading: false,
    error: 0
}

export const sniffimSlice = createSlice({
    name: 'sniffim',
    initialState: INITIAL_STATE,
    reducers: {
    },

    extraReducers: (builder) => {
        //getSniffimThunk-all Sniffim
        builder.addCase(GetSniffimThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(GetSniffimThunk.fulfilled, (state, action) => {
            state.sniffimList = action.payload;
            state.loading = false;
        });
        builder.addCase(GetSniffimThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });

        //EditSniffimThunk-edit Sniff
        builder.addCase(EditSniffimThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(EditSniffimThunk.fulfilled, (state, action) => {
            state.sniffimList = action.payload;
            state.loading = false;
        });
        builder.addCase(EditSniffimThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });
         //AddSniffimThunk-add Sniff
        builder.addCase(addSniffimThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addSniffimThunk.fulfilled, (state, action) => {
            state.sniffimList = action.payload;
            state.loading = false;
        });
        builder.addCase(addSniffimThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });
    }
})
// export const { logoutevents} = productSlice.actions;
