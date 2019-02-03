import jsonwebtoken from 'jsonwebtoken';

class TokenUtil {
  static sign(payload, time = '10d') {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: time });
  }

  static verify(token) {
    try {
      return jsonwebtoken.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}

export default TokenUtil;
