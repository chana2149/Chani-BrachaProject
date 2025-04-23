

import { createSlice } from "@reduxjs/toolkit";

import { GetCostumersThunk } from "./GetCostumersThunk";
import { GetCostumerByIdThunk } from "./GetCostumerByIdThunk";
import { AddCustomersThunk } from "./AddCustomersThunk";
import { AddFavorateThunk } from "./AddFavorateThunk";
import { DeleteFavorateThunk } from "./DeleteFavorateThunk";



const INITIAL_STATE = {
    costumersList: [],
    currentCust: null,
    currentCustFaverate: [],
    currentCustCart: [],
    status: null,
    loading: null,
    error: 0,
    isEmpty:false,
    custCameFrom:''
}

export const costumerSlice = createSlice({
    name: 'costumers',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentCust: (state, action) => {
            state.currentCust = action.payload;
        },
        setcustCameFrom: (state, action) => {
            state.custCameFrom = action.payload;
        },
        addCurrentCustFaverate: (state, action) => {
            state.currentCustFaverate.push(action.payload);
        },
        addCurrentCustCart: (state, action) => {
            state.currentCustCart.push(action.payload);
            state.isEmpty=true;
        },
        deleteCurrentCustCart: (state, action) => {
            state.currentCustCart=state.currentCustCart.filter(o=>o.id!=action.payload.id);
            if(    state.currentCustCart==[])
                state.isEmpty=false;
      
        },
        deleteAllCurrentCustCart: (state, action) => {
            state.currentCustCart=[]
            state.isEmpty=false;
        }

    },

    extraReducers: (builder) => {
        //getcostumers
        builder.addCase(GetCostumersThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(GetCostumersThunk.fulfilled, (state, action) => {
            state.costumersList = action.payload;
            state.loading = false;
        });
        builder.addCase(GetCostumersThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });
        //getcostumersByid
        builder.addCase(GetCostumerByIdThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(GetCostumerByIdThunk.fulfilled, (state, action) => {
            state.currentCust = action.payload;
            state.loading = false;
            state.currentCustFaverate = state.currentCust.idFavorates;

        });
        builder.addCase(GetCostumerByIdThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";

        });
        //add
        builder.addCase(AddCustomersThunk.pending, (state) => {
            state.loading = true;
            // state.status = tr;
        });
        builder.addCase(AddCustomersThunk.fulfilled, (state, action) => {
            // state.costumersList = action.payload;
            state.loading = false;
            state.status = false;
        });
        builder.addCase(AddCustomersThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;

        });
        //addFav
        builder.addCase(AddFavorateThunk.pending, (state) => {
            state.loading = true;
            // state.status = tr;
        });
        builder.addCase(AddFavorateThunk.fulfilled, (state, action) => {
            // state.costumersList = action.payload;
            state.loading = false;
            state.status = false;
        });
        builder.addCase(AddFavorateThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;

        });
        //delete
        builder.addCase(DeleteFavorateThunk.pending, (state) => {
            state.loading = true;
            // state.status = tr;
        });
        builder.addCase(DeleteFavorateThunk.fulfilled, (state, action) => {
            // state.costumersList = action.payload;
            state.loading = false;
            state.status = false;
        });
        builder.addCase(DeleteFavorateThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;

        });
    }
})

export const { setCurrentCust, addCurrentCustFaverate, addCurrentCustCart,deleteCurrentCustCart,deleteAllCurrentCustCart,setcustCameFrom } = costumerSlice.actions;
