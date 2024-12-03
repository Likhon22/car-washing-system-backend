import z from "zod";

const loginValidation = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

const passwordChangeValidation = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  }),
});

const refreshTokenValidation = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required" }),
  }),
});

const authValidations = {
  loginValidation,
  passwordChangeValidation,
  refreshTokenValidation,
};

export default authValidations;
