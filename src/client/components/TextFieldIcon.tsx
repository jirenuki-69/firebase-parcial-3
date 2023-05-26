import React from 'react';
import { KeyboardTypeOptions, StyleSheet } from 'react-native';
import { TextInput, IconButton } from '@react-native-material/core';
import { MaterialIcons } from '@expo/vector-icons';
import useTextField from '../hooks/useTextField';
import TextInputErrorMessage from './TextInputErrorMessage';

type TextFieldIconProps = {
  label: string;
  placeholder: string;
  iconName: any;
  validateCode?: Validate;
  onTextChange: (value: string) => void;
  initialValue?: string;
  keyboardType?: KeyboardTypeOptions
};

const TextFieldIcon: React.FC<TextFieldIconProps> = ({
  label,
  placeholder,
  iconName,
  validateCode = 'text',
  onTextChange,
  initialValue = '',
  keyboardType = 'default'
}) => {
  const { value, error, handleTextInputChange } = useTextField({
    initialValue,
    validateCode
  });

  return (
    <>
      <TextInput
        style={styles.input}
        label={label}
        placeholder={placeholder}
        leading={(props) => (
          <IconButton
            icon={(props) => (
              <MaterialIcons name={iconName} size={24} color="gray" />
            )}
          />
        )}
        value={value}
        onChangeText={(value) => {
          handleTextInputChange(value);
          onTextChange(value);
        }}
        keyboardType={keyboardType}
      />
      <TextInputErrorMessage errorMessage={error} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginBottom: 20
  }
});

export default TextFieldIcon;
