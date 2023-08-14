const validLogin = {
  username: 'Silmar Nascimento',
  password: 'Shanloo',
};

const loginWhithoutUsername = {
  password: 'Shanloo'
};

const loginWithoutPassword = {
  username: 'Silmar Nascimento',
};

const responseWithoutData = { message: '"username" and "password" are required' };
const responseInvalidData = { message: 'Username or password invalid'};

export default {
  validLogin,
  loginWhithoutUsername,
  loginWithoutPassword,
  responseWithoutData,
  responseInvalidData,
};

