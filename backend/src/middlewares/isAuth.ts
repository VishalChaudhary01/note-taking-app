import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomError } from '../utils/custom.error';
import { asyncHandler } from './async.handler';

export interface IUserRequest extends Request {
     userId?: string;
}

export const isAuth = asyncHandler(async (req: IUserRequest, res: Response, next: NextFunction) => {
     const cookie = req.signedCookies[`${process.env.COOKIE_NAME!}`];
     if (!cookie || !cookie.token) {
          throw new CustomError('Please login to access this resource', 'UNAUTHORIZED');
     }
     try {
          jwt.verify(cookie.token, process.env.JWT_SECRET!, function(err: any, decoded: any) {
               if (err) throw new CustomError('Authentication failed', 'AUTHENTICATION_FAILED');
               const user = decoded as JwtPayload;
               if (!user || !user.id) throw new CustomError('Invalid token', 'INSUFFICIENT_PERMISSIONS');
               req.userId = user.id;
               next();
          });
     } catch (error) {
          throw new CustomError('Authentication failed', 'AUTHENTICATION_FAILED');
     }
});