import { useContext, useState } from "react";
import ContextProvider from "./ContextProvider";
import { Context } from "./Context";

function NavBar() {
    const [newProjectName, setNewProjectName] = useState('');
    const { projectList, setProjectList } = useContext(Context);

    function showDialog() {
        document.getElementById('addProject').showModal();
    }
    function closeDialog() {
        setNewProjectName('');
        document.getElementById("addProject").close()
    }
    function addProjectName() {
        setProjectList([...projectList, newProjectName]);
        setNewProjectName('');
        closeDialog();
    }
    function deleteProject(name) {
        setProjectList(projectList.filter(p => p != name));
    }
    return (
        <div className="flex flex-col items-center gap-5 pt-10 px-5 h-screen w-65 bg-white shadow-2xl">
            <h1 className="text-5xl pb-5 text-center font-light">To-do</h1>
            <button>All To Dos</button>
            <button>Completed</button>
            <div className="flex gap-8">
                <h2 className="font-black">Projects</h2>
                <img onClick={showDialog} className="w-4 h-4 self-center" src="./add.png" />
            </div>
            {projectList.map(p =>
                <div key={p} className="flex gap-5">
                    <h2 className="">{p}</h2>
                    <img onClick={() => deleteProject(p)} className="w-2 h-2 self-center" src="./close.png" />
                </div>
            )}
            <dialog id="addProject"
                className="m-auto w-100 rounded-xl p-0 shadow-2xl backdrop:bg-black/40">
                <div className="relative flex flex-col gap-6 p-7">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            Add New Project
                        </h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="projectName"
                            className="text-sm font-medium text-gray-700">Project Name
                        </label>
                        <input
                            id="projectName"
                            type="text"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            placeholder="Enter project name..."
                            className="rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeDialog}
                            className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">Cancel
                        </button>
                        <button
                            onClick={addProjectName}
                            type="button"
                            className="rounded-md bg-amber-300 px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-400 transition">Save
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

function AddTasks() {
    const { projectList, setTaskList } = useContext(Context);

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [date, setDate] = useState("");
    const [project, setProject] = useState("");
    const [priority, setPriority] = useState(2);

    function showDialog() {
        document.getElementById("addTask").showModal();
    }

    function closeDialog() {
        document.getElementById("addTask").close();
    }

    function addTask() {
        const newTask = {
            id: Date.now(),
            completed: false,
            title,
            details,
            date,
            project,
            priority,
        };

        setTaskList((prevTasks) => [...prevTasks, newTask]);

        setTitle("");
        setDetails("");
        setDate("");
        setProject("");
        setPriority(2);

        closeDialog();
    }

    return (
        <>
            <button
                type="button"
                onClick={showDialog}
                className="absolute bottom-10 right-10 flex h-16 w-16 items-center justify-center rounded-full bg-amber-300 text-5xl font-extralight hover:bg-amber-400"
            >
                +
            </button>

            <dialog
                id="addTask"
                className="m-auto w-100 rounded-xl p-0 shadow-2xl backdrop:bg-black/40"
            >
                <div className="relative flex flex-col gap-6 p-7">

                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            Add To-do
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
                            <option key='' value=''>Select project </option>
                            {projectList.map((p) => (
                                <option key={p} value={p}>
                                    {p}
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
                            type="button"
                            onClick={addTask}
                            className="rounded-md bg-amber-300 px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-amber-400"
                        >
                            Save
                        </button>
                    </div>

                </div>
            </dialog>
        </>
    );
}

function Task({ id, title, details, date, project, priority, completed }) {

    const { taskList, setTaskList } = useContext(Context);

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

    const currentPriority = priorityStyles[priority];

    function handleCompleted() {
        const newTaskList = taskList.filter(tsk => tsk.id != id);
        const currentTask = taskList.find(tsk => tsk.id == id);

        currentTask.completed = !currentTask.completed;

        setTaskList([...newTaskList, currentTask]);
    }

    function deleteTask() {
        setTaskList([...taskList.filter(tsk => tsk.id != id)]);
    }

    return (
        <div className={`flex w-sm flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${completed ? "opacity-50" : ""}`}>

            <div className="flex justify-between pb-2">
                <input
                    onChange={handleCompleted}
                    type='checkbox'
                    checked={completed}
                />

                <img
                    onClick={deleteTask}
                    className="w-3 h-3"
                    src='./close.png'
                />
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

            <p className="text-sm leading-6 text-gray-600">
                {details}
            </p>

            <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-3">

                <span className="text-xs text-gray-500">
                    {date}
                </span>

                {project && (
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                        {project}
                    </span>
                )}

            </div>

        </div>
    );
}

function ShowTasks() {
    const { projectList, taskList } = useContext(Context);
    return (
        <div className="flex flex-col gap-8 p-6">
            {projectList.map((prj) => {
                const projectTasks = taskList
                    .filter((task) => task.project === prj)
                    .sort((a, b) => {
                        if (a.completed == true && b.completed == false) {
                            return 1
                        }
                        else if (a.completed == true && b.completed == true) return 0
                        else if (a.priority !== b.priority) {
                            return a.priority - b.priority;
                        }
                        return a.date.localeCompare(b.date);
                    });

                return (
                    <section key={prj}>
                        {projectTasks.length > 0 && <h2 className="mb-4 text-xl font-bold text-gray-800"> {prj} </h2>}
                        <div className="flex flex-wrap gap-4">
                            {projectTasks.map((task) => (
                                <Task
                                    key={task.id}
                                    {...task}
                                />
                            ))}
                        </div>

                    </section>
                );
            })}
        </div>
    );
}

export default function App() {

    return (
        <ContextProvider>
            <div className="flex">
                <NavBar />
                <AddTasks />
                <ShowTasks />
            </div>
        </ContextProvider>
    )
}