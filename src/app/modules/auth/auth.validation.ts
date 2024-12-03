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

const authValidations = {
  loginValidation,
  passwordChangeValidation,
};

export default authValidations;
