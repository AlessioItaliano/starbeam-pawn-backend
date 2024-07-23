const { ctrlWrapper } = require('../helpers');
const { authServices } = require('../services');

const login = async (req, res) => {
  const result = await authServices.logIn(req.body);
  res.status(200).json(result);
};

const logout = async (req, res) => {
  await authServices.logOut(req.user);
  res.status(204).end();
};

const current = async (req, res) => {
  const result = await authServices.current(req.user);
  res.status(200).json(result);
};

module.exports = {
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
};
