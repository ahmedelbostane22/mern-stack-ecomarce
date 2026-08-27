import mongoose, { Schema, Document } from 'mongoose';

export interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

}

const userSchema: Schema<User> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.model<User>('user', userSchema);

export default UserModel;