import mongoose, { Document } from 'mongoose';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface IUserSchema extends Document {
     name: string;
     email: string;
     password: string;
     comparePassword: (password: string) => Promise<boolean>;
     generateTokenAndSaveCookie: (res: Response) => void;
}

const userSchema = new mongoose.Schema<IUserSchema>({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
     if (!this.isModified('password')) return next();
     this.password = await bcrypt.hash(this.password, 10);
     next();
});

userSchema.methods.comparePassword = async function (password: string) {
     return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateTokenAndSaveCookie = function (res: Response) {
     const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
     res.cookie(process.env.COOKIE_NAME!, { token: token }, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'lax',
          signed: true,
     });
};

export const User = mongoose.model<IUserSchema>('User', userSchema);