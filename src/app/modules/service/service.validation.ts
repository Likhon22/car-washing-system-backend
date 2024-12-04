import z from "zod";

const createServiceValidation = z.object({
  body: z.object({
    name: z.string().min(5).max(50),
    price: z.number().positive(),
    description: z.string().min(5).max(250),
    duration: z.number(),
  }),
});

const serviceValidations = {
  createServiceValidation,
};

export default serviceValidations;
