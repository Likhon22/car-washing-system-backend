import z from "zod";

const timeFormatValidation = z
  .string()
  .refine(value => /^(?:[01]?\d|2[0-3]):[0-5]\d$/.test(value), {
    message: "Time must be in HH:mm format (e.g., 09:00)",
  });

const slotValidation = z.object({
  body: z.object({
    service: z.string(),
    date: z.string(),
    startTime: timeFormatValidation,
    endTime: timeFormatValidation,
  }),
});

const slotValidations = {
  slotValidation,
};

export default slotValidations;
