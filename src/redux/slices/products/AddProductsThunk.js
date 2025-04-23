import { createAsyncThunk } from "@reduxjs/toolkit";


export const AddProductsThunk = createAsyncThunk(
    'AddProductsThunk',
    async (pr) => {
        const response = await fetch("https://localhost:7088/api/Products/Add", {
            method: 'POST',
            body: JSON.stringify(pr),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error();
        }
        const data = await response.json();
        return data;
    }
);