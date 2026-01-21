import { useState } from 'react';
import TasksList from './TasksList';

const TasksNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('in-progress');
  const tabs = [
    { id: 'in-progress', label: 'In Progress Tasks' },
    { id: 'todo', label: 'To-Do Tasks' },
    { id: 'completed', label: 'Completed Tasks' },
    { id: 'cancelled', label: 'Cancelled Tasks' },
  ];
  return (
    <section className="py-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === tab.id
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
      <div className="mt-4">
        {activeTab === 'in-progress' && <TasksList context="in-progress" />}
        {activeTab === 'todo' && <TasksList context="todo" />}
        {activeTab === 'completed' && <TasksList context="completed" />}
        {activeTab === 'cancelled' && <TasksList context="cancelled" />}
      </div>
    </section>
  );
};

export default TasksNavigation;
