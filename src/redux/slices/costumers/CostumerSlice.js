import { createSlice } from "@reduxjs/toolkit";
import { GetCostumersThunk } from "./GetCostumersThunk";
import { GetCostumerByIdThunk } from "./GetCostumerByIdThunk";
import { AddCustomersThunk } from "./AddCustomersThunk";
import { AddFavorateThunk } from "./AddFavorateThunk";
import { DeleteFavorateThunk } from "./DeleteFavorateThunk";

// בדיקה אם יש מידע ב-sessionStorage ושימוש בו כמצב התחלתי
const loadStateFromSessionStorage = () => {
    try {
        const currentCust = JSON.parse(sessionStorage.getItem('currentCust'));
        const currentCustFaverate = JSON.parse(sessionStorage.getItem('currentCustFaverate')) || [];
        const currentCustCart = JSON.parse(sessionStorage.getItem('currentCustCart')) || [];
        const isEmpty = sessionStorage.getItem('isEmpty') === 'true';
        const custCameFrom = sessionStorage.getItem('custCameFrom') || '';
        
        return {
            costumersList: [],
            currentCust,
            currentCustFaverate,
            currentCustCart,
            status: null,
            loading: null,
            error: 0,
            isEmpty,
            custCameFrom
        };
    } catch (err) {
        return {
            costumersList: [],
            currentCust: null,
            currentCustFaverate: [],
            currentCustCart: [],
            status: null,
            loading: null,
            error: 0,
            isEmpty: false,
            custCameFrom: ''
        };
    }
};

const INITIAL_STATE = loadStateFromSessionStorage();

export const costumerSlice = createSlice({
    name: 'costumers',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentCust: (state, action) => {
            state.currentCust = action.payload;
            // שמירה ב-sessionStorage
            sessionStorage.setItem('currentCust', JSON.stringify(action.payload));
        },
        setcustCameFrom: (state, action) => {
            state.custCameFrom = action.payload;
            sessionStorage.setItem('custCameFrom', action.payload);
        },
        addCurrentCustFaverate: (state, action) => {
            state.currentCustFaverate.push(action.payload);
            sessionStorage.setItem('currentCustFaverate', JSON.stringify(state.currentCustFaverate));
        },
        addCurrentCustCart: (state, action) => {
            state.currentCustCart.push(action.payload);
            state.isEmpty = true;
            sessionStorage.setItem('currentCustCart', JSON.stringify(state.currentCustCart));
            sessionStorage.setItem('isEmpty', 'true');
        },
        deleteCurrentCustCart: (state, action) => {
            state.currentCustCart = state.currentCustCart.filter(o => o.id != action.payload.id);
            if (state.currentCustCart.length === 0) {
                state.isEmpty = false;
                sessionStorage.setItem('isEmpty', 'false');
            }
            sessionStorage.setItem('currentCustCart', JSON.stringify(state.currentCustCart));
        },
        deleteAllCurrentCustCart: (state, action) => {
            state.currentCustCart = [];
            state.isEmpty = false;
            sessionStorage.setItem('currentCustCart', JSON.stringify([]));
            sessionStorage.setItem('isEmpty', 'false');
        }
    },
    extraReducers: (builder) => {
        //getcostumers
        builder.addCase(GetCostumersThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(GetCostumersThunk.fulfilled, (state, action) => {
            state.costumersList = action.payload;
            state.loading = false;
        });
        builder.addCase(GetCostumersThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });
        //getcostumersByid
        builder.addCase(GetCostumerByIdThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(GetCostumerByIdThunk.fulfilled, (state, action) => {
            state.currentCust = action.payload;
            state.loading = false;
            state.currentCustFaverate = state.currentCust.idFavorates;
            // שמירה ב-sessionStorage
            sessionStorage.setItem('currentCust', JSON.stringify(action.payload));
            sessionStorage.setItem('currentCustFaverate', JSON.stringify(state.currentCust.idFavorates));
        });
        builder.addCase(GetCostumerByIdThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
        });
        //add
        builder.addCase(AddCustomersThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(AddCustomersThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.status = false;
        });
        builder.addCase(AddCustomersThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });
        //addFav
        builder.addCase(AddFavorateThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(AddFavorateThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.status = false;
        });
        builder.addCase(AddFavorateThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });
        //delete
        builder.addCase(DeleteFavorateThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(DeleteFavorateThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.status = false;
        });
        builder.addCase(DeleteFavorateThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.error = "Failed to get data";
            state.loading = false;
        });
    }
})

export const { setCurrentCust, addCurrentCustFaverate, addCurrentCustCart, deleteCurrentCustCart, deleteAllCurrentCustCart, setcustCameFrom } = costumerSlice.actions;
