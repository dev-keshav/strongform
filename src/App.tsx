// src/App.tsx

import React from 'react';
import Form from './components/Form';
import validationRules from './formValidation/validationRules';
import { Values } from './formValidation/types';

const App: React.FC = () => {
  const handleSubmit = (values: Values) => {
    console.log('Form submitted:', values);
  };

  return (
    <div className="app">
      <Form
        validationRules={validationRules}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
