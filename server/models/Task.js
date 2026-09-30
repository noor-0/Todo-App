import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
        title: { type: String, required: true, trim: true },
        details: { type: String, default: "", trim: true },
        date: { type: String, default: "" }, 
        project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null },
        priority: { type: Number, enum: { values: [1, 2, 3], message: "Priority must be 1, 2 or 3" }, default: 2 }, // 1 = High, 2 = Medium, 3 = Low
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
