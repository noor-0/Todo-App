export default function Task({ id, title, details, date, project, priority, completed }) {

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