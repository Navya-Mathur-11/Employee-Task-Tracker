import { useState } from 'react';
import { mockEmployees } from './data/mockData';
import type { Employee, Task } from './data/mockData';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import GlobalAddTaskForm from './components/GlobalAddTaskForm';

type FilterStatus = 'All' | 'Pending' | 'In Progress' | 'Completed';

function App() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [filter, setFilter] = useState<FilterStatus>('All');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleAddTask = (employeeId: number, task: Omit<Task, 'id'>) => {
    setEmployees((prevEmployees) => {
      return prevEmployees.map((employee) => {
        if (employee.id === employeeId) {
          // Find the maximum task ID across all employees to ensure uniqueness
          const allTaskIds = prevEmployees.flatMap((emp) =>
            emp.tasks.map((t) => t.id)
          );
          const newTaskId =
            allTaskIds.length > 0 ? Math.max(...allTaskIds) + 1 : 1;

          const employeeName = employee.name;
          setSuccessMessage(`Task "${task.title}" added to ${employeeName}!`);
          setTimeout(() => setSuccessMessage(''), 3000);

          return {
            ...employee,
            tasks: [...employee.tasks, { ...task, id: newTaskId }],
          };
        }
        return employee;
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Employee Task Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage tasks and track progress for your team
          </p>
        </header>

        <Dashboard employees={employees} />

        <div className="mt-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Add New Task</h2>
          </div>
          <GlobalAddTaskForm employees={employees} onAddTask={handleAddTask} />
        </div>

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Employees</h2>
            <div className="flex flex-wrap gap-2">
              {(['All', 'Pending', 'In Progress', 'Completed'] as FilterStatus[]).map(
                (filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption)}
                    className={`px-3 py-2 text-sm sm:px-4 sm:text-base rounded-lg font-medium transition-colors ${
                      filter === filterOption
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {filterOption}
                  </button>
                )
              )}
            </div>
          </div>

          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center justify-between">
              <span>{successMessage}</span>
              <button
                onClick={() => setSuccessMessage('')}
                className="text-green-700 hover:text-green-900"
              >
                ×
              </button>
            </div>
          )}

          <EmployeeList
            employees={employees}
            onAddTask={handleAddTask}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
