import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetProductsByCattegoryThunk = createAsyncThunk(
    'GetProductsByCattegoryThunk',
    async (id) => {
        const response = await fetch(`https://localhost:7088/api/Products/getByCattegory/${id}`);
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

