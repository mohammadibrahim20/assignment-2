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
  isActive: z.enum(['active', 'deactivate']),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string().nonempty({ message: 'Street must be required' }),
    city: z.string().nonempty({ message: 'city must be required' }),
    country: z.string().nonempty({ message: 'country must be required' }),
  }),
});

export { userValidationSchema };
