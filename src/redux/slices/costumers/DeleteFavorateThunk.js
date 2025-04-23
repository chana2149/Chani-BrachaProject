import { createAsyncThunk } from "@reduxjs/toolkit";


export const DeleteFavorateThunk = createAsyncThunk(
    'DeleteFavorateThunk',
    async ({customerid,prodid}) => {
        const response = await fetch(`https://localhost:7088/api/Costumer/DeleteFav/${customerid}/${prodid}`, {
            method: 'DELETE',
           
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