
import { getProductsThunk } from "./GetAllProductsThunk";

import { createSlice } from "@reduxjs/toolkit";
import { GetProductMainThunk } from "./GetProductMainThunk";
import { GetProductsByCattegoryThunk } from "./GetProductsByCattegoryThunk";
import { AddProductsThunk } from "./AddProductsThunk";
import { GetProductsByIdThunk } from "./GetProductsByIdThunk";
import { EditProductThunk } from "./EditProductThunk";
import { AddProductsMainThunk } from "./AddProductsMainThunk";
import { DeleteProdMainThunk } from "./DeleteProdMainThunk";



const INITIAL_STATE = {
    productsList: [],
    productsListForSearch: [],

    product: {},
    token: 0,
    loading: false,
    loadingGet: false,
    error: 0
}

export const productSlice = createSlice({
    name: 'products',
    initialState: INITIAL_STATE,
    reducers: {
        logoutevents: (state, action) => {
            state.productsList = [];
            state.token = 0;
            state.loading = false;
            state.error = 0;

        }
        ,
        FocusOnsearch: (state, action) => {
            state.productsListForSearch = state.productsList;
        },
        search: (state, action) => {
            state.productsList = state.productsListForSearch;
            alert("ttt".includes("tt"))
            // state.productsList = state.productsList.filter(x => { JSON.stringify(x.name).includes(JSON.stringify(action.payload)) || JSON.stringify(x.details).includes(JSON.stringify(action.pa)) })
            alert(JSON.stringify(state.productsList.filter(x => { JSON.stringify(x.name).includes(JSON.stringify(action.payload)) || JSON.stringify(x.details).includes(JSON.stringify(action.pa)) })))
        }

    },

    extraReducers: (builder) => {
        //getProductsThunk-all products
        builder.addCase(getProductsThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProductsThunk.fulfilled, (state, action) => {
            state.productsList = action.payload;
            state.productsListForSearch = action.payload;
            state.loading = false;
        });
        builder.addCase(getProductsThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });
        //GetProductMainThunk- productMain for product
        // builder.addCase(GetProductMainThunk.pending, (state) => {
        //     state.loading = true;
        // });
        // builder.addCase(GetProductMainThunk.fulfilled, (state, action) => {
        //     state.productsList = action.payload;
        //     state.loading = false;
        // });
        // builder.addCase(GetProductMainThunk.rejected, (state, action) => {
        //     console.log("action: ", action);
        //     state.error = "Failed to get data";
        //     state.loading = false;
        // });

        //GetProductsByCattegoryThunk
        builder.addCase(GetProductsByCattegoryThunk.pending, (state) => {
            state.loadingGet = true;
        });
        builder.addCase(GetProductsByCattegoryThunk.fulfilled, (state, action) => {
            state.productsList = action.payload;
            state.productsListForSearch = action.payload;

            state.loadingGet = false;
        });
        builder.addCase(GetProductsByCattegoryThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loadingGet = false;
        });

        //GetProductsByIdThunk
        builder.addCase(GetProductsByIdThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(GetProductsByIdThunk.fulfilled, (state, action) => {
            state.product = action.payload;
            state.loading = false;
        });
        builder.addCase(GetProductsByIdThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });


        //add
        builder.addCase(AddProductsThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(AddProductsThunk.fulfilled, (state, action) => {
            state.productsList = action.payload;
            state.loading = false;
        });
        builder.addCase(AddProductsThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });

        //addMain
        builder.addCase(AddProductsMainThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(AddProductsMainThunk.fulfilled, (state, action) => {
            state.productsList = action.payload;
            state.loading = false;
        });
        builder.addCase(AddProductsMainThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });
        //edit
        builder.addCase(EditProductThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(EditProductThunk.fulfilled, (state, action) => {
            state.productsList = action.payload;
            state.loading = false;
        });
        builder.addCase(EditProductThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });

        //delete
        builder.addCase(DeleteProdMainThunk.pending, (state) => {
            state.loading = true;
            // state.status = tr;
        });
        builder.addCase(DeleteProdMainThunk.fulfilled, (state, action) => {
            state.productsList = action.payload;
            state.loading = false;
            state.status = false;
        });
        builder.addCase(DeleteProdMainThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;

        });

    }
})
export const { search } = productSlice.actions;
