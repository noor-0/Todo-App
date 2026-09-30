import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import { clearCompleted } from "../Store/taskSlice";
import { getToday } from "../utils";

// completed last, then by priority (High first), then by date (no date last)
function sortTasks(a, b) {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (a.priority !== b.priority) return a.priority - b.priority;
    if (a.date === b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date.localeCompare(b.date);
}

const emptyMessages = {
    all: "No to-dos yet. Click + to add your first one.",
    today: "Nothing is due today.",
    completed: "No completed to-dos yet.",
    project: "No to-dos in this project yet. Click + to add one.",
};

export default function ShowTasks() {
    const dispatch = useDispatch();
    const { projectList } = useSelector(state => state.projects);
    const { taskList, filter, loading } = useSelector(state => state.tasks);

    const selectedProject = projectList.find(p => p._id === filter);
    const today = getToday();

    // 1. pick the tasks for the selected menu item
    let visibleTasks = taskList;
    if (filter === "today") visibleTasks = taskList.filter(t => t.date === today);
    if (filter === "completed") visibleTasks = taskList.filter(t => t.completed);

    // 2. group them by project (tasks without a project go under "No project")
    let groups = [...projectList, { _id: null, name: "No project" }];
    if (selectedProject) groups = [selectedProject];

    const titles = { all: "All To Dos", today: "Today", completed: "Completed" };
    const heading = selectedProject ? selectedProject.name : titles[filter];
    const hasCompleted = taskList.some(t => t.completed);

    return (
        <div className="flex flex-col gap-8 p-6 pb-32">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-light text-gray-900">{heading}</h1>
                {filter === "completed" && hasCompleted && (
                    <button
                        type="button"
                        onClick={() => dispatch(clearCompleted())}
                        className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-200"
                    >
                        Clear completed
                    </button>
                )}
            </div>

            {loading && taskList.length === 0 && <p className="text-gray-500">Loading your to-dos...</p>}

            {!loading && visibleTasks.length === 0 && (
                <p className="text-gray-500">{emptyMessages[selectedProject ? "project" : filter]}</p>
            )}

            {groups.map((prj) => {
                const projectTasks = visibleTasks
                    .filter((task) => (task.project || null) === prj._id)
                    .sort(sortTasks);

                if (projectTasks.length === 0) return null;

                return (
                    <section key={prj._id || "none"}>
                        {!selectedProject && <h2 className="mb-4 text-xl font-bold text-gray-800"> {prj.name} </h2>}
                        <div className="flex flex-wrap gap-4">
                            {projectTasks.map((task) => (
                                <Task
                                    key={task._id}
                                    task={task}
                                    projectName={selectedProject ? "" : prj._id && prj.name}
                                />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}