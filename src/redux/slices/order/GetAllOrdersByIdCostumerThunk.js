import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllOrdersByIdCostumerThunk = createAsyncThunk(
    'GetAllOrdersByIdCostumerThunk',
    async (id) => {
        const response = await fetch(`https://localhost:7088/api/Orders/getByIdCostumer/${id}`);
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

