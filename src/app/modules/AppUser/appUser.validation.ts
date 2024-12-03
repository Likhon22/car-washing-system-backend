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
    password: z.string(),
    appUser: z.object({
      name: createNameValidations,
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

const updateNameValidations = z.object({
  firstName: z.string().min(2).max(50).optional(),
  middleName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
});
const updateAddressValidations = z.object({
  city: z.string().optional(),
  area: z.string().optional(),
  houseNo: z.string().optional(),
  street: z.string().optional(),
  streetNo: z.string().optional(),
});
const updateAppUserValidation = z.object({
  body: z.object({
    appUser: z.object({
      name: updateNameValidations.optional(),
      phone: z
        .string()
        .regex(
          /^01\d{9}$/,
          "Invalid phone number format. Please use the format '01XXXXXXXXXX'.",
        ),
      address: updateAddressValidations.optional(),
    }),
  }),
});

const appUserValidations = {
  createAppUserValidation,
  updateAppUserValidation,
};

export default appUserValidations;
