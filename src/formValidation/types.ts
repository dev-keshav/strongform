// src/formValidation/types.ts

export interface Values {
    [key: string]: string;
  }
  
  export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: string, values: Values) => string | boolean;
  }
  
  export interface ValidationRules {
    [key: string]: ValidationRule;
  }
  