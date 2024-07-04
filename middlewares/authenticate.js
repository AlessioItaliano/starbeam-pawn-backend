const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { HttpError } = require('../helpers');
const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(new HttpError(401, 'Not authorized'));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const result = await User.findById(id);

    if (!result || !result.token || result.token !== token) {
      next(new HttpError(401, 'Not authorized'));
    }
    req.user = result;
    next();
  } catch {
    next(new HttpError(401, 'Not authorized'));
  }
};

module.exports = authenticate;
