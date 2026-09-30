export default function ShowTasks() {
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