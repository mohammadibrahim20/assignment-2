import z from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: 'First Name must be a required field' }),
  lastName: z
    .string()
    .nonempty({ message: 'Last Name must be a required field' }),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().regex(/^[a-zA-Z0-9_-]{3,}$/, {
    message:
      'Username must be at least 3 characters long and can only contain alphanumeric characters, dashes, and underscores.',
  }),
  password: z
    .string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/,
      {
        message:
          'Password must contain at least 8 characters, including at least one number, one uppercase, one lowercase letter, and one special character.',
      },
    ),
  fullName: userNameValidationSchema,
  age: z
    .number()
    .positive({ message: "Age must be a positive number'" })
    .int({ message: "'Age must be an integer'" }),
  email: z.string().email({ message: 'Invalid email format' }).nonempty(),
  isActive: z.enum(['active', 'deactivate']),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string().nonempty({ message: 'Street must be required' }),
    city: z.string().nonempty({ message: 'city must be required' }),
    country: z.string().nonempty({ message: 'country must be required' }),
  }),
});

export { userValidationSchema };
