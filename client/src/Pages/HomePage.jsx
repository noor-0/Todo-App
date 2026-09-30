import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Components/Navbar";
import AddTasks from "../Components/AddTask";
import ShowTasks from "../Components/ShowTask";
import { fetchProjects, clearProjectError } from "../Store/projectSlice";
import { fetchTasks, clearTaskError } from "../Store/taskSlice";

export default function HomePage() {
    const dispatch = useDispatch();
    const taskError = useSelector(state => state.tasks.error);
    const projectError = useSelector(state => state.projects.error);
    const error = taskError || projectError;

    // load this user's projects and tasks from the server
    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchTasks());
    }, [dispatch]);

    function closeError() {
        dispatch(clearTaskError());
        dispatch(clearProjectError());
    }

    return (
        <div className="flex h-screen">
            <NavBar />
            <main className="flex-1 overflow-y-auto">
                {error && (
                    <div className="m-6 mb-0 flex items-center justify-between rounded-md bg-red-100 px-4 py-3 text-sm text-red-700">
                        <span>{error}</span>
                        <button type="button" onClick={closeError} className="font-semibold">
                            Dismiss
                        </button>
                    </div>
                )}
                <ShowTasks />
            </main>
            <AddTasks />
        </div>
    )
}