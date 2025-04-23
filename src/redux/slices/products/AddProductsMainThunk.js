import { createAsyncThunk } from "@reduxjs/toolkit";


export const AddProductsMainThunk = createAsyncThunk(
    'AddProductsMainThunk',
    async (pr) => {
        debugger
        const response = await fetch("https://localhost:7088/api/ProductsMain/Add", {
            method: 'POST',
            body: JSON.stringify(pr),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        debugger
        if (!response.ok) {
            throw new Error();
        }
        const data = await response.json();
        return data;
    }
);