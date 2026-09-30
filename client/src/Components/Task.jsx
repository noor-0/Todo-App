import { useDispatch } from "react-redux";
import { toggleTask, deleteTask, setEditingTask } from "../Store/taskSlice";
import { formatDate, getToday } from "../utils";

const priorityStyles = {
    1: {
        label: "High",
        className: "bg-red-100 text-red-700",
    },
    2: {
        label: "Medium",
        className: "bg-orange-100 text-orange-700",
    },
    3: {
        label: "Low",
        className: "bg-yellow-100 text-yellow-700",
    },
};

export default function Task({ task, projectName }) {
    const dispatch = useDispatch();
    const { _id, title, details, date, priority, completed } = task;

    const currentPriority = priorityStyles[priority];
    const isOverdue = !completed && date && date < getToday();

    function handleCompleted() {
        dispatch(toggleTask(task));
    }

    function handleDelete() {
        dispatch(deleteTask(_id));
    }

    function handleEdit() {
        dispatch(setEditingTask(task));
        document.getElementById("addTask").showModal();
    }

    return (
        <div className={`flex w-sm flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${completed ? "opacity-50" : ""}`}>

            <div className="flex items-center justify-between pb-2">
                <input
                    onChange={handleCompleted}
                    type='checkbox'
                    checked={completed}
                    title={completed ? "Mark as not done" : "Mark as done"}
                />

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="text-xs font-medium text-gray-500 hover:text-gray-900"
                    >
                        Edit
                    </button>
                    <button type="button" onClick={handleDelete} title="Delete to-do">
                        <img
                            className="w-3 h-3"
                            src='./close.png'
                            alt="Delete to-do"
                        />
                    </button>
                </div>
            </div>

            <div className="flex items-start justify-between gap-4">

                <h2 className={`text-lg font-semibold text-gray-900 ${completed ? "line-through" : ""}`}>
                    {title}
                </h2>

                <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${currentPriority.className}`}
                >
                    {currentPriority.label}
                </span>

            </div>

            {details && (
                <p className="text-sm leading-6 text-gray-600 whitespace-pre-line">
                    {details}
                </p>
            )}

            <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3">

                <span className={`text-xs ${isOverdue ? "font-semibold text-red-600" : "text-gray-500"}`}>
                    {date ? formatDate(date) : "No date"}
                    {isOverdue && " (overdue)"}
                </span>

                {projectName && (
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                        {projectName}
                    </span>
                )}

            </div>

        </div>
    );
}