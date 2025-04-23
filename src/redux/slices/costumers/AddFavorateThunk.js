import { createAsyncThunk } from "@reduxjs/toolkit";


export const AddFavorateThunk = createAsyncThunk(
    'AddFavorateThunk',
    async ({customerid,prodid}) => {
        const response = await fetch(`https://localhost:7088/api/Costumer/AddFav/${customerid}/${prodid}`, {
            method: 'POST',
           
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