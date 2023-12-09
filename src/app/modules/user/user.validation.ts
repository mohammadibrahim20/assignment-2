import z from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string({
    invalid_type_error: 'First Name must be a required field',
  }),
  lastName: z.string({
    invalid_type_error: 'Last Name must be a required field',
  }),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string({ invalid_type_error: 'username must be a string' }),
  password: z.string({ invalid_type_error: 'password must be string' }),
  fullName: userNameValidationSchema,
  age: z
    .number()
    .positive({ message: "Age must be a positive number'" })
    .int({ message: "'Age must be an integer'" }),
  email: z.string().email({ message: 'Invalid email format' }).nonempty(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string().nonempty({ message: 'Street must be required' }),
    city: z.string().nonempty({ message: 'city must be required' }),
    country: z.string().nonempty({ message: 'country must be required' }),
  }),
});

const UpdateUserNameValidationSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First Name must be a required field',
    })
    .optional(),
  lastName: z
    .string({
      invalid_type_error: 'Last Name must be a required field',
    })
    .optional(),
});

const UpdateUserValidationSchema = z.object({
  userId: z.number().optional(),
  username: z
    .string({ invalid_type_error: 'username must be a string' })
    .optional(),
  password: z
    .string({ invalid_type_error: 'password must be string' })
    .optional(),
  fullName: UpdateUserNameValidationSchema,
  age: z
    .number()
    .positive({ message: "Age must be a positive number'" })
    .int({ message: "'Age must be an integer'" })
    .optional(),
  email: z.string().email({ message: 'Invalid email format' }).optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: z.object({
    street: z
      .string()
      .nonempty({ message: 'Street must be required' })
      .optional(),
    city: z.string().nonempty({ message: 'city must be required' }).optional(),
    country: z
      .string()
      .nonempty({ message: 'country must be required' })
      .optional(),
  }),
});

export { UpdateUserNameValidationSchema, userValidationSchema };
