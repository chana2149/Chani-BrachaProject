import { createAsyncThunk } from "@reduxjs/toolkit";


export const AddCustomersThunk = createAsyncThunk(
    'AddCustomersThunk',
    async (customer) => {
        const response = await fetch("https://localhost:7088/api/Costumer/Add", {
            method: 'POST',
            body: JSON.stringify(customer),
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