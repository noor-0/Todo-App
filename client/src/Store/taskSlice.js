import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import { request } from "../api";
import { logout } from "./authSlice";
import { deleteProject } from "./projectSlice";

export const fetchTasks = createAsyncThunk("tasks/fetch", () => request("/tasks"));

export const addTask = createAsyncThunk("tasks/add", (task) =>
    request("/tasks", "POST", task)
);

export const updateTask = createAsyncThunk("tasks/update", ({ _id, ...changes }) =>
    request(`/tasks/${_id}`, "PUT", changes)
);

export const toggleTask = createAsyncThunk("tasks/toggle", (task) =>
    request(`/tasks/${task._id}`, "PUT", { completed: !task.completed })
);

export const deleteTask = createAsyncThunk("tasks/delete", (id) =>
    request(`/tasks/${id}`, "DELETE")
);

export const clearCompleted = createAsyncThunk("tasks/clearCompleted", () =>
    request("/tasks/completed", "DELETE")
);

const initialState = {
    taskList: [],
    loading: false,
    error: null,
    filter: "all", // "all", "today", "completed" or a project id
    editingTask: null, // task open in the edit dialog
};

function replaceTask(state, action) {
    state.taskList = state.taskList.map(t => t._id === action.payload._id ? action.payload : t);
}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setFilter: (state, action) => { state.filter = action.payload; },
        setEditingTask: (state, action) => { state.editingTask = action.payload; },
        clearTaskError: (state) => { state.error = null; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => { state.loading = true; })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.taskList = action.payload;
            })
            .addCase(fetchTasks.rejected, (state) => { state.loading = false; })
            .addCase(addTask.fulfilled, (state, action) => {
                state.taskList.push(action.payload);
            })
            .addCase(updateTask.fulfilled, replaceTask)
            // tick the checkbox right away, then undo it if the server fails
            .addCase(toggleTask.pending, (state, action) => {
                const task = state.taskList.find(t => t._id === action.meta.arg._id);
                if (task) task.completed = !action.meta.arg.completed;
            })
            .addCase(toggleTask.rejected, (state, action) => {
                const task = state.taskList.find(t => t._id === action.meta.arg._id);
                if (task) task.completed = action.meta.arg.completed;
            })
            .addCase(toggleTask.fulfilled, replaceTask)
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.taskList = state.taskList.filter(t => t._id !== action.payload.id);
            })
            .addCase(clearCompleted.fulfilled, (state) => {
                state.taskList = state.taskList.filter(t => !t.completed);
            })
            // the server deletes a project's tasks with it, so do the same here
            .addCase(deleteProject.fulfilled, (state, action) => {
                const projectId = action.payload.id;
                state.taskList = state.taskList.filter(t => t.project !== projectId);
                if (state.filter === projectId) state.filter = "all";
            })
            .addCase(logout.fulfilled, () => initialState)
            // add/update errors are shown inside the task dialog instead
            .addMatcher(
                isAnyOf(fetchTasks.rejected, toggleTask.rejected, deleteTask.rejected, clearCompleted.rejected),
                (state, action) => { state.error = action.error.message; }
            );
    },
});

export const { setFilter, setEditingTask, clearTaskError } = taskSlice.actions;
export default taskSlice.reducer;
