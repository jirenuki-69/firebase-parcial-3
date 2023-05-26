import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, IconButton } from '@react-native-material/core';
import { MaterialIcons } from '@expo/vector-icons';
import useTextField from '../hooks/useTextField';
import TextInputErrorMessage from './TextInputErrorMessage';

type TextFieldIconButtonProps = {
  label: string;
  placeholder: string;
  leadingIconName?: any;
  trailingIconName: any;
  onIconPress: () => void;
  validateCode?: Validate;
  secureTextEntry?: boolean;
  onTextChange: (value: string) => void;
};

const TextFieldIconButton: React.FC<TextFieldIconButtonProps> = ({
  label,
  placeholder,
  leadingIconName,
  trailingIconName,
  onIconPress,
  validateCode = 'text',
  secureTextEntry = false,
  onTextChange
}) => {
  const { value, error, handleTextInputChange } = useTextField({
    initialValue: '',
    validateCode
  });

  return (
    <>
      <TextInput
        style={styles.input}
        label={label}
        placeholder={placeholder}
        leading={(props) => (
          <MaterialIcons name={leadingIconName} size={24} color="gray" />
        )}
        trailing={(props) => (
          <IconButton
            icon={(props) => (
              <MaterialIcons name={trailingIconName} size={24} color="gray" />
            )}
            onPress={onIconPress}
            {...props}
          />
        )}
        value={value}
        onChangeText={(value) => {
          handleTextInputChange(value);
          onTextChange(value);
        }}
        secureTextEntry={secureTextEntry}
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

export default TextFieldIconButton;
