import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@react-native-material/core';

type Props = {
  errorMessage: string | null;
};

const TextInputErrorMessage: React.FC<Props> = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }

  return (
    <Text variant="body1" style={styles.text}>
      {errorMessage}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    marginBottom: 10
  }
});

export default TextInputErrorMessage;
