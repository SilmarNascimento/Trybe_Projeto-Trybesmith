import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../utils/jwt.util';
import UserModel from '../database/models/user.model';

const getToken = (authorization: string): string => authorization.split(' ')[1];

const tokenValidation = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { authorization } = request.headers;
    if (!authorization) { return response.status(401).json({ message: 'Token not found' }); }
    const token = getToken(authorization);
    const decoded = jwtUtil.verify(token);
    const user = await UserModel.findOne({ where: { username: decoded.username } });
    if (!user) {
      return response.status(401).json({ message: 'Erro ao procurar o usuário do token' });
    }
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default tokenValidation;
