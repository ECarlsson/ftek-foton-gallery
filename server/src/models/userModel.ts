import { Model, model, Schema } from 'mongoose';
import { User } from '../types';
import bcrypt from 'bcrypt';

const userSchema: Schema<User> = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true }
});

userSchema.index({ email: 1 });

/**
 * Hashes the password before saving it
 */
 userSchema.pre('save', async function (next) {
  const hash: string = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const UserModel: Model<User> = model('User', userSchema);