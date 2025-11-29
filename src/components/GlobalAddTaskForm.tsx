import { useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
import type { Employee, Task } from '../data/mockData';

interface GlobalAddTaskFormProps {
  employees: Employee[];
  onAddTask: (employeeId: number, task: Omit<Task, 'id'>) => void;
}

export default function GlobalAddTaskForm({
  employees,
  onAddTask,
}: GlobalAddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(
    employees[0]?.id || 0
  );
  const [status, setStatus] = useState<Task['status']>('Pending');
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && selectedEmployeeId) {
      onAddTask(selectedEmployeeId, { title: title.trim(), status });
      setTitle('');
      setStatus('Pending');
      setSelectedEmployeeId(employees[0]?.id || 0);
      setIsOpen(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setTitle('');
    setStatus('Pending');
    setSelectedEmployeeId(employees[0]?.id || 0);
  };

  if (showSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-700">
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-medium">Task added successfully!</span>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
      >
        <Plus className="w-4 h-4" />
        Add New Task
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-lg space-y-4"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Add New Task
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Task Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          autoFocus
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assigned Employee
        </label>
        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name} - {employee.role}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Initial Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Task['status'])}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

