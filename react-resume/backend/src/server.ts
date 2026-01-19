import express from 'express';
import { errorHandler } from '@/middlewares/error.middleware';
import { logMessage } from '@/utils/logger';

const app = express();

// ... your routes ...
app.get('/', (req, res) => {
  res.send('Hello, React Resume!');
});

// The error handler MUST be the last middleware added
app.use(errorHandler);

app.listen(3000, () => {
  logMessage('Server is running with global error handling', 'info');
  logMessage('Listening on port 3000', 'info');
});
