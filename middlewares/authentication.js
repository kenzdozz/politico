import Response from '../helpers/Response';
import codes from '../helpers/statusCode';
import TokenUtil from '../helpers/TokenUtil';

const authenticated = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (!token) {
    return Response.send(res, codes.unAuthorized, {
      error: 'Authorization is required to access this content.',
    });
  }
  token = token.split(' ')[1] || token;
  const user = TokenUtil.verify(token);
  if (!user) {
    return Response.send(res, codes.unAuthorized, {
      error: 'Provided authorization is invalid or has expired.',
    });
  }
  req.user = user;
  return next();
};

const isAdmin = (req, res, next) => {
  if (!req.user.isadmin) {
    return Response.send(res, codes.unAuthorized, {
      error: 'You are not permitted to access this content.',
    });
  }
  return next();
};

export { authenticated, isAdmin };
