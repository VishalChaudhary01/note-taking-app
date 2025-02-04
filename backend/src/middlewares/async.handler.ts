import { NextFunction, Request, Response } from 'express';
import { IUserRequest } from './isAuth';

export const asyncHandler = (
  fn: (req: Request | IUserRequest, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request | IUserRequest, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
