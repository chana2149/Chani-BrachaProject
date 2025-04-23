import { createAsyncThunk } from "@reduxjs/toolkit";


export const EditProductThunk = createAsyncThunk(
    'EditProductThunk',
    async (p) => {
        debugger
        const response = await fetch("https://localhost:7088/api/Products/Update", {
            method:"PUT",
            body: JSON.stringify(p),
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