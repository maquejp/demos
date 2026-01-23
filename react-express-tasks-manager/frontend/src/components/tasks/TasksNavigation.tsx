import { Box, Button, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TasksList from './TasksList';

const TasksNavigation: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { id: 'in-progress', label: 'In Progress Tasks' },
    { id: 'todo', label: 'To-Do Tasks' },
    { id: 'completed', label: 'Completed Tasks' },
    { id: 'cancelled', label: 'Cancelled Tasks' },
  ];

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box component="section" sx={{ py: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate('/tasks/add')}
        >
          New Task
        </Button>
      </Box>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mb: 2,
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={tab.id} label={tab.label} id={`tab-${index}`} />
        ))}
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {activeTab === 0 && <TasksList status="in-progress" />}
        {activeTab === 1 && <TasksList status="todo" />}
        {activeTab === 2 && <TasksList status="completed" />}
        {activeTab === 3 && <TasksList status="cancelled" />}
      </Box>
    </Box>
  );
};

export default TasksNavigation;
