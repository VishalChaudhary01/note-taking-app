import { z } from 'zod';

export const SignupValidator = z.object({
     name: z.string({ message: 'Name is required' }).min(1, 'Name is too short').max(25, 'Name is too large').trim(),
     email: z.string({ message: 'Email is required' }).email('Invalid email address').min(1, 'Email is required').trim(),
     password: z.string({ message: 'Password is required' }).min(6, 'Password must be at least 6 characters long').max(25, 'Password is too large'),
})

export const SigninValidator = z.object({
     email: z.string({ message: 'Email is required' }).email('Invalid email address').min(1, 'Email is required').trim(),
     password: z.string({ message: 'Password is required' }),
})
