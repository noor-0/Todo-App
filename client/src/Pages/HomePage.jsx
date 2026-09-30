import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import AddTasks from "../Components/AddTask";
import ShowTasks from "../Components/ShowTask";

import { fetchProjects, clearProjectError } from "../Store/projectSlice";
import { fetchTasks, clearTaskError } from "../Store/taskSlice";

export default function HomePage() {
    const dispatch = useDispatch();

    const taskError = useSelector(state => state.tasks.error);
    const projectError = useSelector(state => state.projects.error);

    const error = taskError || projectError;

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchTasks());
    }, [dispatch]);

    function closeError() {
        dispatch(clearTaskError());
        dispatch(clearProjectError());
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">

            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col">

                <Header />

                <main className="min-h-0 flex-1 overflow-y-auto">

                    {error && (
                        <div className="mx-6 mt-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            <span>{error}</span>

                            <button
                                type="button"
                                onClick={closeError}
                                className="font-semibold hover:underline"
                            >
                                Dismiss
                            </button>
                        </div>
                    )}

                    <ShowTasks />

                </main>

            </div>

            <AddTasks />

        </div>
    );
}