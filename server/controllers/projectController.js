import Project from "../models/Project.js";
import Task from "../models/Task.js";

export async function getProjects(req, res) {
    const projects = await Project.find({ user: req.userId }).sort({ createdAt: 1 });
    res.json(projects);
}

export async function createProject(req, res) {
    const name = (req.body.name || "").trim();

    if (!name) {
        return res.status(400).json({ message: "Project name is required" });
    }

    const exists = await Project.findOne({ user: req.userId, name });
    if (exists) {
        return res.status(400).json({ message: "You already have a project with this name" });
    }

    const project = await Project.create({ user: req.userId, name });
    res.status(201).json(project);
}

export async function deleteProject(req, res) {
    const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }

    await Task.deleteMany({ user: req.userId, project: project._id });

    res.json({ id: project._id });
}
