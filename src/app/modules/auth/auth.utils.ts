import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: {
    email: string;
    role: string;
  },
  secret: string,
  expireDate: string,
) => {
  const token = jwt.sign(jwtPayload, secret, { expiresIn: expireDate });
  return `Bearer ${token}`;
};
