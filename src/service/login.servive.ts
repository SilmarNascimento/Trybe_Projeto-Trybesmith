import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import Token from '../types/Token';
import jwtUtil from '../utils/jwt.util';

type Login = {
  username: string,
  password: string
};

const userLogin = async ({ username, password }: Login): Promise<ServiceResponse<Token>> => {
  if (!username || !password) {
    return { status: 'BAD_REQUEST', data: { message: '"username" and "password" are required' } };
  }
  const userFound = await UserModel.findOne({ where: { username } });
  if (!userFound || !bcrypt.compareSync(password, userFound.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }
  const { id } = userFound.dataValues;
  const token = jwtUtil.sign({ id, username });
  return { status: 'SUCCESSFUL', data: { token } };
};

export default {
  userLogin,
};