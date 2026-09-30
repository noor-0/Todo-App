import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../Store/projectSlice";
import { setFilter } from "../Store/taskSlice";

export default function Sidebar() {
    const dispatch = useDispatch();

    const { projectList } = useSelector(state => state.projects);
    const { filter } = useSelector(state => state.tasks);
    const { user } = useSelector(state => state.auth);

    const [showProjectInput, setShowProjectInput] = useState(false);
    const [projectName, setProjectName] = useState("");

    function selectFilter(value) {
        dispatch(setFilter(value));
    }

    async function handleAddProject(e) {
        e.preventDefault();

        const name = projectName.trim();

        if (!name) return;

        try {
            await dispatch(addProject(name)).unwrap();
            setProjectName("");
            setShowProjectInput(false);
        } catch {
            // Project errors are handled by the existing HomePage error area.
        }
    }

    function isActive(value) {
        return filter === value;
    }

    return (
        <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">

            {/* Logo */}
            <div className="border-b border-gray-100 px-6 py-6">
                <h1 className="text-2xl font-light tracking-tight text-gray-900">
                    To-do
                </h1>
                <p className="mt-1 text-xs text-gray-400">
                    Stay organized
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-5">

                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Tasks
                </p>

                <button
                    type="button"
                    onClick={() => selectFilter("all")}
                    className={`mb-1 flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition ${
                        isActive("all")
                            ? "bg-amber-100 font-semibold text-gray-900"
                            : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    <span className="mr-3">◉</span>
                    All tasks
                </button>

                <button
                    type="button"
                    onClick={() => selectFilter("pending")}
                    className={`mb-1 flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition ${
                        isActive("pending")
                            ? "bg-amber-100 font-semibold text-gray-900"
                            : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    <span className="mr-3">○</span>
                    Pending
                </button>

                <button
                    type="button"
                    onClick={() => selectFilter("completed")}
                    className={`mb-1 flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition ${
                        isActive("completed")
                            ? "bg-amber-100 font-semibold text-gray-900"
                            : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    <span className="mr-3">✓</span>
                    Completed
                </button>

                <div className="mt-8">

                    <div className="mb-2 flex items-center justify-between px-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Projects
                        </p>

                        <button
                            type="button"
                            onClick={() => setShowProjectInput(!showProjectInput)}
                            className="text-lg leading-none text-gray-400 transition hover:text-gray-900"
                            title="Add project"
                        >
                            +
                        </button>
                    </div>

                    {showProjectInput && (
                        <form onSubmit={handleAddProject} className="mb-3 px-2">
                            <input
                                autoFocus
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="Project name..."
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                            />

                            <div className="mt-2 flex gap-2">
                                <button
                                    type="submit"
                                    className="rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-700"
                                >
                                    Add
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowProjectInput(false);
                                        setProjectName("");
                                    }}
                                    className="rounded-md px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    {projectList.length === 0 ? (
                        <p className="px-3 text-sm text-gray-400">
                            No projects yet.
                        </p>
                    ) : (
                        <div className="space-y-1">
                            {projectList.map((project) => (
                                <button
                                    key={project._id}
                                    type="button"
                                    onClick={() => selectFilter(project._id)}
                                    className={`flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                        isActive(project._id)
                                            ? "bg-amber-100 font-semibold text-gray-900"
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                >
                                    <span className="mr-3 text-gray-400">
                                        #
                                    </span>

                                    <span className="truncate">
                                        {project.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>

            {/* Bottom user section */}
            <div className="border-t border-gray-100 p-4">

                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-200 text-sm font-semibold text-gray-800">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                            {user?.name || "User"}
                        </p>

                        <p className="truncate text-xs text-gray-400">
                            {user?.email}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}