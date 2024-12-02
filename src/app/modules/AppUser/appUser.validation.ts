import { z } from "zod";

const createNameValidations = z.object({
  firstName: z.string().min(2).max(50),
  middleName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50),
});

const createAddressValidations = z.object({
  city: z.string(),
  area: z.string(),
  houseNo: z.string(),
  street: z.string(),
  streetNo: z.string(),
});

const createAppUserValidation = z.object({
  body: z.object({
    appUser: z.object({
      name: createNameValidations,
      id: z.string(),
      email: z.string().email(),
      phone: z
        .string()
        .regex(
          /^01\d{9}$/,
          "Invalid phone number format. Please use the format '01XXXXXXXXXX'.",
        ),
      address: createAddressValidations,
    }),
  }),
});

const appUserValidations = {
  createAppUserValidation,
};

export default appUserValidations;
