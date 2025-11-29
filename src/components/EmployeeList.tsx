import type { Employee, Task } from '../data/mockData';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { User, Briefcase } from 'lucide-react';

type FilterStatus = 'All' | 'Pending' | 'In Progress' | 'Completed';

interface EmployeeListProps {
  employees: Employee[];
  onAddTask: (employeeId: number, task: Omit<Task, 'id'>) => void;
  filter: FilterStatus;
}

export default function EmployeeList({
  employees,
  onAddTask,
  filter,
}: EmployeeListProps) {
  const filterTasks = (tasks: Task[]) => {
    if (filter === 'All') {
      return tasks;
    }
    return tasks.filter((task) => task.status === filter);
  };

  return (
    <div className="space-y-6">
      {employees.map((employee) => {
        const filteredTasks = filterTasks(employee.tasks);
        return (
          <div
            key={employee.id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {employee.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm">{employee.role}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700">
                  Tasks ({filteredTasks.length}
                  {filter !== 'All' && ` of ${employee.tasks.length}`})
                </h4>
              </div>

              {filteredTasks.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic mb-4">
                  {employee.tasks.length === 0
                    ? 'No tasks assigned'
                    : `No ${filter.toLowerCase()} tasks`}
                </p>
              )}

              <AddTaskForm
                employeeName={employee.name}
                onAddTask={(task) => onAddTask(employee.id, task)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

