import { useState } from 'react';

type Props = {
  initialValue: string;
  validateCode: Validate;
};

type TextFieldResult = {
  value: string;
  error: string | null;
  handleTextInputChange: (value: string) => void;
};

const validateEmail = (email: string): string | null => {
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmail) {
    return 'Invalid address';
  }
  return null;
};

const validateText = (text: string): string | null => {
  if (text.length === 0) {
    return 'Empty Field';
  }

  return null;
};

const useTextField = ({
  initialValue,
  validateCode
}: Props): TextFieldResult => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const validate = (value: string): string | null => {
    switch (validateCode) {
      case 'email-address':
        return validateEmail(value);
      case 'text':
        return validateText(value);
      default:
        return null;
    }
  };

  const handleTextInputChange = (value: string) => {
    setValue(value);
    if (validate) {
      const errorMessage = validate(value);
      setError(errorMessage);
    }
  };

  return {
    value,
    error,
    handleTextInputChange
  };
};

export default useTextField;
