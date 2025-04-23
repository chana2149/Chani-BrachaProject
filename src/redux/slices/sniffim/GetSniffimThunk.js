import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetSniffimThunk = createAsyncThunk(
    'GetSniffimThunk',
    async () => {
        const response = await fetch(`https://localhost:7088/api/Sniffim/getAll`);
        if (response.ok) {
            debugger
            const data = await response.json();
            console.log(data)
            return data;
        }
        else {
            throw new Error('faild to fetch');
        }
    }
)

