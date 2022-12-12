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
