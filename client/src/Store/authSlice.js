import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../api";

function saveUser(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
}

export const signup = createAsyncThunk("auth/signup", async (userData) => {
    const data = await request("/auth/signup", "POST", userData);
    return saveUser(data);
});

export const login = createAsyncThunk("auth/login", async (userData) => {
    const data = await request("/auth/login", "POST", userData);
    return saveUser(data);
});

export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
});

const initialState = {
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token"),
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => { state.loading = true; })
            .addCase(login.pending, (state) => { state.loading = true; })
            .addCase(signup.rejected, (state) => { state.loading = false; })
            .addCase(login.rejected, (state) => { state.loading = false; })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export default authSlice.reducer;
