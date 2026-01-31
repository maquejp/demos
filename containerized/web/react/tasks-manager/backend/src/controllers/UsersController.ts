import type { Request, Response } from 'express';
import { UsersService } from '@/services/UsersService';

export class UsersController {
  private usersService = new UsersService();

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      // Placeholder for actual logic to get all users
      const response = await this.usersService.getAll(req, res); // This would be replaced with real data fetching logic
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

  getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.usersService.getOne(req, res);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };

  getOneByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const response = await this.usersService.getOneByEmail(req, res);
      res.status(response.status).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  };
}
