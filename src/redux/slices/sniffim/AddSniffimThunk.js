import { createAsyncThunk } from "@reduxjs/toolkit";


export const addSniffimThunk = createAsyncThunk(
    'addSniffimThunk',
    async (sniff) => {
        const response = await fetch("https://localhost:7088/api/Sniffim/Add", {
            method: 'POST',
            body: JSON.stringify(sniff),
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