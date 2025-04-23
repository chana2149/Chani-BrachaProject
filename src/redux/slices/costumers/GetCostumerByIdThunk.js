import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetCostumerByIdThunk = createAsyncThunk(
    'GetCostumerByIdThunk',
    async (id) => {
        const response = await fetch(`https://localhost:7088/api/Costumer/GetById/${id}`);
       
        if (response.ok) {
             if (response.status===204) {
              return null;
         }
            const data = response.json();
           // console.log(data)
            return data;
        }
        else {
            throw new Error('faild to fetch');
        }
    }
)

