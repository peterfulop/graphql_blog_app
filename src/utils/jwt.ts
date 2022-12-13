import JWT from 'jsonwebtoken';
import { config } from '../config/config';

export const JWTSign = (input: { userId: string; email: string }) => {
  return JWT.sign(
    { userId: input.userId, email: input.email },
    config.cookie.sessiontokenKey,
    {
      expiresIn: config.cookie.sessiontokenExp,
    }
  );
};

export const JWTVerify = (token: string) => {
  try {
    return JWT.verify(token, config.cookie.sessiontokenKey) as {
      userId: string;
    };
  } catch (error) {
    return null;
  }
};
