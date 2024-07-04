const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const createToken = user => {
  const payload = { id: user._id };

  const result = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });

  return result;
};

module.exports = createToken;
