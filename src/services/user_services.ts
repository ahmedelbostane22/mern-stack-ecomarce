import UserModel from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export const registerUser = async ({ firstName, lastName, email, password }: RegisterUserRequest) => {
  const findUser = await UserModel.findOne({ email });
  if (findUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);
  const newUser = new UserModel({ firstName, lastName, email, password: hashedPassword });
  await newUser.save();

  return {
    data: generateToken({ id: newUser._id, email: newUser.email }),
    message: 'User registered successfully',
    statuscode: 201
  };
};






interface LoginUserRequest {
    email: string;
    password: string;
}

export const loginUser = async ({email , password}: LoginUserRequest) => {
const user = await UserModel.findOne({ email });
if (!user){
    return {message: 'User not found', statuscode: 404};
}
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid){
   return {message: 'Invalid password', statuscode: 401};
}
else{
    return {data: generateToken({ id: user._id, email: user.email }) , message: 'User logged in successfully'
       ,statuscode: 200

    };
}
}


const generateToken = (data: any) => {
  const token = jwt.sign(data, "RPqBQ4yE/Y4E+NZsYFSXL6m6ommdp6YyXn9tPiUCRtY=" );
  return token;
};
