import { createAsyncThunk } from "@reduxjs/toolkit";


export const DeleteProdMainThunk = createAsyncThunk(
    'DeleteProdMainThunk',
    async (id) => {
        debugger
        const response = await fetch(`https://localhost:7088/api/ProductsMain/notUse/${id}`, {
            method: 'PUT',
           
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