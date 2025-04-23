import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetCostumersThunk = createAsyncThunk(
    'GetCostumersThunk',
    async () => {
        const response = await fetch("https://localhost:7088/api/Costumer/getAll");
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return data;
        }
        else {
            throw new Error('faild to fetch');
        }
    }
)

