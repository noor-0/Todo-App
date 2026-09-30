export default function NavBar() {
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