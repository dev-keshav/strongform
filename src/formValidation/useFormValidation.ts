// src/hooks/useFormValidation.ts

import { useState } from 'react';
import { ValidationRules, Values } from '../formValidation/types';

interface UseFormValidation {
  values: Values;
  errors: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
}

const useFormValidation = (initialState: Values, validate: (values: Values) => { [key: string]: string }): UseFormValidation => {
  const [values, setValues] = useState<Values>(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted successfully:', values);
      // Trigger the submission handler passed as a prop here, if needed.
    } else {
      console.log('Form has errors');
    }
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};

export default useFormValidation;
