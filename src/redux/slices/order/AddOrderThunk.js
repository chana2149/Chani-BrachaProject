import { createAsyncThunk } from "@reduxjs/toolkit";

export const AddOrderThunk = createAsyncThunk(
    'AddOrderThunk',
    async (Orders) => {
        const response = await fetch("https://localhost:7088/api/Orders/Add", {
            method: 'POST',
            body: JSON.stringify(Orders),
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
)

