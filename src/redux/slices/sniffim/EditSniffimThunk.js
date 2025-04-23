import { createAsyncThunk } from "@reduxjs/toolkit";


export const EditSniffimThunk = createAsyncThunk(
    'EditSniffimThunk',
    async (snif) => {
        const response = await fetch("https://localhost:7088/api/Sniffim/Update", {
            method: 'PUT',
            body: JSON.stringify(snif),
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