import ContextProvider from "./ContextProvider";

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