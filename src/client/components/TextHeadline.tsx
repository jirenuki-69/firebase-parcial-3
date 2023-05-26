import React from 'react';
import { Text } from '@react-native-material/core';

type TextHeadlineProps = {
  text: string;
  bold?: boolean;
}

const TextHeadline: React.FC<TextHeadlineProps> = ({ text, bold }) => (
  <Text variant="h4"  style={{ margin: 16, fontWeight: bold ? 'bold' : 'normal' }}>
    {text}
  </Text>
);

export default TextHeadline;
