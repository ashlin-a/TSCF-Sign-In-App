import 'dotenv/config';
import pkg from 'jsonwebtoken';
const { verify } = pkg;

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    res.status(401).json({
      message: 'Admin is not authorized.',
    });
  } else {
    try {
      const words = token.split(' ');
      const jwtToken = words[1];
      const decoded = verify(jwtToken, process.env.JWT_ADMIN_SECRET);

      req.username = decoded.username;
      next();
    } catch (error) {
      // console.log(error);
      res.status(401).json({
        message: 'Admin is not authorized.',
      });
    }
  }
}

export default adminMiddleware;
