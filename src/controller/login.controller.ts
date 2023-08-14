import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import loginServive from '../service/login.servive';

const userLogin = async (request: Request, response: Response): Promise<Response> => {
  const { username, password } = request.body; 
  const { status, data } = await loginServive.userLogin({ username, password });
  return response.status(mapStatusHTTP(status)).json(data);
};

export default {
  userLogin,
};