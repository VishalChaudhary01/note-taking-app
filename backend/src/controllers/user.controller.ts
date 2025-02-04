import { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/async.handler';
import { User } from '../models/user.model';
import { SigninValidator, SignupValidator } from '../validators/auth.validator';
import { CustomError } from '../utils/custom.error';
import { IUserRequest } from '../middlewares/isAuth';

export const signup = asyncHandler(async (req: Request, res: Response) => {
     const data = SignupValidator.parse(req.body);
     const user = await User.findOne({ email: data.email });
     if (user) throw new CustomError('Email is already registered', 'BAD_REQUEST');
     const newUser = await User.create(data);
     newUser.generateTokenAndSaveCookie(res);
     res.status(201).json({ success: true, message: 'User created successfully' });
});

export const signin = asyncHandler(async (req: Request, res: Response) => {
     const data = SigninValidator.parse(req.body);
     const user = await User.findOne({ email: data.email });
     if (!user) throw new CustomError('User not found', 'NOT_FOUND')
     const isMatch = await user.comparePassword(data.password);
     if (!isMatch) throw new CustomError('Invalid password', 'BAD_REQUEST')
     user.generateTokenAndSaveCookie(res);
     res.status(200).json({ success: true, message: 'User logged in successfully' });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
     res.clearCookie(`${process.env.COOKIE_NAME}`).status(200).json({ success: true, message: 'User logged out successfully' });
});

export const getProfile = asyncHandler(async (req: IUserRequest, res: Response) => {
     const user = await User.findById(req.userId);
     if (!user) throw new CustomError('User not found', 'NOT_FOUND');
     res.status(200).json({ success: true, message: 'User fetched successfully', user: {
          id: user._id,
          name: user.name,
          email: user.email,
     }});
});
