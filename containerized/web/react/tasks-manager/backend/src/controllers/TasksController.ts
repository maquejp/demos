import type { Request, Response } from 'express';
import { TasksService } from '@/services/TasksService';

export class TasksController {
  private tasksService = new TasksService();
  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.tasksService.getAll(req, res);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.tasksService.getOne(req, res);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.tasksService.update(req, res);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
}
