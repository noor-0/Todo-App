import Task from "../models/Task.js";
import Project from "../models/Project.js";

async function checkProject(projectId, userId) {
    if (!projectId) return true;
    const project = await Project.findOne({ _id: projectId, user: userId });
    return Boolean(project);
}

export async function getTasks(req, res) {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: 1 });
    res.json(tasks);
}

export async function createTask(req, res) {
    const { title, details, date, project, priority } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({ message: "Title is required" });
    }
    if (!(await checkProject(project, req.userId))) {
        return res.status(400).json({ message: "Project not found" });
    }

    const task = await Task.create({
        user: req.userId,
        title,
        details,
        date,
        project: project || null,
        priority,
    });

    res.status(201).json(task);
}

export async function updateTask(req, res) {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    const { title, details, date, project, priority, completed } = req.body;

    if (title !== undefined && !title.trim()) {
        return res.status(400).json({ message: "Title is required" });
    }
    if (project !== undefined && !(await checkProject(project, req.userId))) {
        return res.status(400).json({ message: "Project not found" });
    }

    if (title !== undefined) task.title = title;
    if (details !== undefined) task.details = details;
    if (date !== undefined) task.date = date;
    if (project !== undefined) task.project = project || null;
    if (priority !== undefined) task.priority = priority;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.json(task);
}

export async function deleteTask(req, res) {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json({ id: task._id });
}

export async function clearCompleted(req, res) {
    const result = await Task.deleteMany({ user: req.userId, completed: true });
    res.json({ deletedCount: result.deletedCount });
}
