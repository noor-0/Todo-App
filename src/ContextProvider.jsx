import { useState } from "react";
import { Context } from "./Context";

export default function ContextProvider({ children }) {
    const [taskList, setTaskList] = useState([]);
    const [projectList, setProjectList] = useState(['project1', 'project2', 'project3']);

    return (
        <Context.Provider value={{ taskList, setTaskList, projectList, setProjectList }}>
            {children}
        </Context.Provider>
    )
}