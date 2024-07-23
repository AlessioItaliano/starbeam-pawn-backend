const bcrypt = require('bcryptjs');

const { User } = require('../models');
const { HttpError } = require('../helpers');
const { createToken } = require('../helpers');

const logIn = async body => {
  const user = await User.findOne({ email: body.email });

  if (!user) {
    throw new HttpError(401, 'Email  is incorrect');
  }
  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);

  if (!isPasswordCorrect) {
    throw new HttpError(401, ' password is incorrect');
  }

  const userToken = createToken(user);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { token: userToken },
    { new: true }
  );

  return updatedUser;
};

const logOut = async user => {
  await User.findByIdAndUpdate(user._id, { token: null });
};

const current = async user => {
  return user;
};

module.exports = {
  logIn,
  logOut,
  current,
};
