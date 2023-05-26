import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  text: string;
  onClick: () => void;
  style?: Object;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, style = {} }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{ ...styles.button, ...style }}
      activeOpacity={0.5}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20
  },
  text: {
    color: '#fff',
    padding: 20,
    fontWeight: 'bold'
  }
});

export default Button;
