import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { request } from "../api";
import { logout } from "./authSlice";

export const fetchProjects = createAsyncThunk("projects/fetch", () => request("/projects"));

export const addProject = createAsyncThunk("projects/add", (name) =>
    request("/projects", "POST", { name })
);

export const deleteProject = createAsyncThunk("projects/delete", (id) =>
    request(`/projects/${id}`, "DELETE")
);

const initialState = {
    projectList: [],
    error: null,
};

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        clearProjectError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projectList = action.payload;
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.projectList.push(action.payload);
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.projectList = state.projectList.filter(p => p._id !== action.payload.id);
            })
            .addCase(logout.fulfilled, () => initialState)
            // addProject errors are shown inside the "Add project" dialog instead
            .addMatcher(isAnyOf(fetchProjects.rejected, deleteProject.rejected), (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;
