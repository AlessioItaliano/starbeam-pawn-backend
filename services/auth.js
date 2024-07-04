const bcrypt = require('bcryptjs');

const { User } = require('../models');
const { HttpError } = require('../helpers');
const { createToken } = require('../helpers');

const signUp = async body => {
  const user = await User.findOne({ email: body.email });

  if (user) {
    throw new HttpError(409, 'This user is already exist');
  }
  const hashedPassword = await bcrypt.hash(body.password, 12);

  const newUser = await User.create({ ...body, password: hashedPassword });

  const userToken = createToken(newUser);
  const updatedUser = await User.findByIdAndUpdate(
    newUser._id,
    { token: userToken },
    { new: true }
  );

  return { user: updatedUser, token: userToken };
};

const logIn = async body => {
  const user = await User.findOne({ email: body.email });

  if (!user) {
    throw new HttpError(401, 'Email or password is incorrect');
  }
  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);

  if (!isPasswordCorrect) {
    throw new HttpError(401, 'Email or password is incorrect');
  }

  const userToken = createToken(user);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { token: userToken },
    { new: true }
  );

  return { user: updatedUser, token: userToken };
};

const logout = async user => {
  await User.findByIdAndUpdate(user._id, { token: null });
};

const current = async user => {
  return { user };
};

module.exports = {
  signUp,
  logIn,
  logout,
  current,
};
