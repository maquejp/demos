import express from 'express';
import { errorHandler } from '@/middlewares/error.middleware';
import { logMessage } from '@/utils/logger';
import tasksRoutes from '@/routes/TasksRoutes';
import usersRoutes from '@/routes/UsersRoutes';

const app = express();

app.use(express.json());

// ... your routes ...
app.get('/', (req, res) => {
  res.send('Hello, React Express Tasks Manager!');
});
app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);

// The error handler MUST be the last middleware added
app.use(errorHandler);

app.listen(3000, () => {
  logMessage('Server is running with global error handling', 'info');
  logMessage('Listening on port http://localhost:3000', 'info');
});
