export interface Task {
  id: number;
  title: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  tasks: Task[];
}

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Software Engineer',
    tasks: [
      {
        id: 1,
        title: 'Implement user authentication',
        status: 'Completed',
      },
      {
        id: 2,
        title: 'Design database schema',
        status: 'In Progress',
      },
      {
        id: 3,
        title: 'Write unit tests',
        status: 'Pending',
      },
      {
        id: 4,
        title: 'Code review for PR #123',
        status: 'Pending',
      },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Product Manager',
    tasks: [
      {
        id: 5,
        title: 'Create product roadmap',
        status: 'In Progress',
      },
      {
        id: 6,
        title: 'Conduct user interviews',
        status: 'Completed',
      },
      {
        id: 7,
        title: 'Update product documentation',
        status: 'Pending',
      },
      {
        id: 8,
        title: 'Prepare sprint planning',
        status: 'In Progress',
      },
      {
        id: 9,
        title: 'Review analytics dashboard',
        status: 'Pending',
      },
    ],
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'UI/UX Designer',
    tasks: [
      {
        id: 10,
        title: 'Design landing page mockups',
        status: 'Completed',
      },
      {
        id: 11,
        title: 'Create component library',
        status: 'In Progress',
      },
      {
        id: 12,
        title: 'User flow diagrams',
        status: 'Pending',
      },
      {
        id: 13,
        title: 'Accessibility audit',
        status: 'Pending',
      },
    ],
  },
];

