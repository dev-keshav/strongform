// src/formValidation/validationRules.ts

import { ValidationRules, Values } from './types'; // Import Values here

const validationRules: ValidationRules = {
  username: {
    required: true,
    minLength: 3,
    maxLength: 15,
    pattern: /^[a-zA-Z0-9_]+$/,
    validate: (value: string) =>
      value.trim().length > 0 || 'Username cannot be empty',
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    validate: (value: string) =>
      value.trim().length > 0 || 'Email cannot be empty',
  },
  password: {
    required: true,
    minLength: 6,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
    validate: (value: string) =>
      value.trim().length > 0 || 'Password cannot be empty',
  },
  confirmPassword: {
    required: true,
    validate: (value: string, values: Values) =>
      value === values.password || 'Passwords must match',
  },
};

export default validationRules;
