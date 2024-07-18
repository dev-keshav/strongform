// src/components/Form.tsx

import React from 'react';
// import useFormValidation from '../hooks/useFormValidation';
import useFormValidation from '../formValidation/useFormValidation';
import { ValidationRules, Values } from '../formValidation/types';
import './Form.css';

interface FormProps {
  validationRules: ValidationRules;
  onSubmit: (values: Values) => void;
}

const Form: React.FC<FormProps> = ({ validationRules, onSubmit }) => {
  const initialValues: Values = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validate = (values: Values) => {
    const errors: { [key: string]: string } = {};
    Object.keys(validationRules).forEach(key => {
      const rule = validationRules[key];
      const value = values[key];
      const error = rule.validate ? rule.validate(value, values) : '';

      if (rule.required && !value.trim()) {
        errors[key] = 'This field is required';
      } else if (rule.minLength && value.length < rule.minLength) {
        errors[key] = `Must be at least ${rule.minLength} characters`;
      } else if (rule.maxLength && value.length > rule.maxLength) {
        errors[key] = `Must be no more than ${rule.maxLength} characters`;
      } else if (rule.pattern && !rule.pattern.test(value)) {
        errors[key] = 'Invalid format';
      } else if (typeof error === 'string' && error) {
        errors[key] = error;
      }
    });
    return errors;
  };

  const { values, errors, handleChange, handleBlur, handleSubmit, resetForm } = useFormValidation(initialValues, validate);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your username"
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={resetForm}>Reset</button>
      </form>
    </div>
  );
};

export default Form;
