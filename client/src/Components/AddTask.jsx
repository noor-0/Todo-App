import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, setEditingTask } from "../Store/taskSlice";

export default function AddTasks() {
    const dispatch = useDispatch();
    const { projectList } = useSelector(state => state.projects);
    const { editingTask, filter } = useSelector(state => state.tasks);

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [date, setDate] = useState("");
    const [project, setProject] = useState("");
    const [priority, setPriority] = useState(2);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDetails(editingTask.details);
            setDate(editingTask.date);
            setProject(editingTask.project || "");
            setPriority(editingTask.priority);
        }
    }, [editingTask]);

    function showDialog() {
        const isProjectFilter = projectList.some(p => p._id === filter);
        setProject(isProjectFilter ? filter : "");
        document.getElementById("addTask").showModal();
    }

    function closeDialog() {
        document.getElementById("addTask").close();
    }

    function resetForm() {
        setTitle("");
        setDetails("");
        setDate("");
        setProject("");
        setPriority(2);
        setError("");
        dispatch(setEditingTask(null));
    }

    async function saveTask(e) {
        e.preventDefault();

        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        const task = { title, details, date, project, priority };

        setSaving(true);
        try {
            if (editingTask) {
                await dispatch(updateTask({ _id: editingTask._id, ...task })).unwrap();
            } else {
                await dispatch(addTask(task)).unwrap();
            }
            closeDialog();
        } catch (err) {
            setError(err.message);
        }
        setSaving(false);
    }

    return (
        <>
            <button
                type="button"
                onClick={showDialog}
                title="Add to-do"
                className="fixed bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full bg-amber-300 text-5xl font-extralight shadow-lg hover:bg-amber-400"
            >
                +
            </button>

            <dialog
                id="addTask"
                onClose={resetForm}
                className="m-auto w-100 rounded-xl p-0 shadow-2xl backdrop:bg-black/40"
            >
                <form onSubmit={saveTask} className="relative flex flex-col gap-6 p-7">

                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            {editingTask ? "Edit To-do" : "Add To-do"}
                        </h1>
                    </div>

                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="taskTitle"
                            className="text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>

                        <input
                            id="taskTitle"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title..."
                            className="rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                        />

                        <label
                            htmlFor="taskDetails"
                            className="text-sm font-medium text-gray-700"
                        >
                            Details
                        </label>

                        <textarea
                            id="taskDetails"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Enter task details..."
                            rows="3"
                            className="resize-none rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                        />

                        <label
                            htmlFor="taskDate"
                            className="text-sm font-medium text-gray-700"
                        >
                            Date
                        </label>

                        <input
                            id="taskDate"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                        />

                        <label
                            htmlFor="taskProject"
                            className="text-sm font-medium text-gray-700"
                        >
                            Select Project
                        </label>

                        <select
                            id="taskProject"
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                        >
                            <option value=''>No project</option>
                            {projectList.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>

                        <label className="mt-2 text-sm font-medium text-gray-700">
                            Priority
                        </label>

                        <div className="flex gap-4">
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="priority"
                                    value={1}
                                    checked={priority === 1}
                                    onChange={(e) => setPriority(Number(e.target.value))}
                                />
                                High
                            </label>

                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="priority"
                                    value={2}
                                    checked={priority === 2}
                                    onChange={(e) => setPriority(Number(e.target.value))}
                                />
                                Medium
                            </label>

                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="priority"
                                    value={3}
                                    checked={priority === 3}
                                    onChange={(e) => setPriority(Number(e.target.value))}
                                />
                                Low
                            </label>
                        </div>

                        {error && <p className="text-sm text-red-600">{error}</p>}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeDialog}
                            className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-md bg-amber-300 px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-amber-400 disabled:opacity-50"
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>

                </form>
            </dialog>
        </>
    );
}