const jwt = require('jsonwebtoken');
const _ = require('lodash');
const moment = require('moment');
const permittedRoutes = require('../api/permitted-routes');


const verifyToken = (token) => {
  const obj = jwt.verify(token, process.env.SUPER_SECRET);
  return obj;
};

const isTokenNotRequired = (req) => {
  const { url } = req;
  return _.includes(permittedRoutes, url.split('?')[0]);
};

const tokenToUserMW = (req, res, next) => {
  if (isTokenNotRequired(req)) {
    return next();
  }

  const token = _.get(req, 'headers.x-access-token');
  if (token) {
    try {
      const jsonToken = verifyToken(token);
      if (jsonToken && jsonToken._id && jsonToken.email && moment().utc().unix() <= jsonToken.exp) {
        req.userId = jsonToken._id;
        return next();
      }
      return res.status(401).json({ message: 'Not Authorized' });
    } catch (ex) {
      return res.status(401).json({ message: 'Not Authorized' });
    }
  }
  return res.status(401).json({ message: 'Not Authorized' });
};

module.exports = {
    tokenToUserMW
};