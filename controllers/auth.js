const { ctrlWrapper } = require('../helpers');

const { authService } = require('../services');

const signup = async (req, res) => {
  const result = await authService.signUp(req.body);
  res.status(201).json(result);
};

const login = async (req, res) => {
  const result = await authService.logIn(req.body);
  res.status(200).json(result);
};

const logout = async (req, res) => {
  await authService.logout(req.user);
  res.status(204).end();
};

const current = async (req, res) => {
  const result = await authService.current(req.user);
  res.status(200).json(result);
};

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
};
