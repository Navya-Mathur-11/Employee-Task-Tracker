import { useState } from "react";
import { Plus, CheckCircle2 } from "lucide-react";
import type { Task } from "../data/mockData";

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, "id">) => void;
  employeeName: string;
}

export default function AddTaskForm({
  onAddTask,
  employeeName,
}: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<Task["status"]>("Pending");
  const [isOpen, setIsOpen] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({ title: title.trim(), status });
      setTitle("");
      setStatus("Pending");
      setIsOpen(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700 text-sm">
        <CheckCircle2 className="w-4 h-4" />
        <span>Task added!</span>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <Plus className="w-4 h-4" />
        Add Task
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Task for {employeeName}
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            setTitle("");
            setStatus("Pending");
          }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
