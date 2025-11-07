import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cities: [],
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        fetchAdminsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchAdminsSuccess(state, action) {
            state.loading = false;
            state.admins = action.payload;
        },
        fetchAdminsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addAdmin(state, action) {
            state.admins.push(action.payload);
        },
        removeAdmin(state, action) {
            state.admins = state.admins.filter(admin => admin.id !== action.payload);
        },
        updateAdmin(state, action) {
            const index = state.admins.findIndex(admin => admin.id === action.payload.id);
            if (index !== -1) {
                state.admins[index] = action.payload;
            }
        },
    },
});

export const {
    fetchAdminsStart,
    fetchAdminsSuccess,
    fetchAdminsFailure,
    addAdmin,
    removeAdmin,
    updateAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;