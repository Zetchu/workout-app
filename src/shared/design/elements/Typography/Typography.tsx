import React from 'react';
// Import StyleProp and TextStyle together
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { colors, typographyStyles } from '../../foundations/index';

interface TypographyProps {
  variant?: 'display' | 'title' | 'body' | 'label';
  style?: StyleProp<TextStyle>; // Updated to accept native array conditions
  children: React.ReactNode;
  numberOfLines?: number;
}

export default function Typography({
  variant = 'body',
  style,
  children,
  numberOfLines,
}: TypographyProps) {
  return (
    <Text
      style={[styles.base, styles[variant], style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.textMain,
    fontFamily: 'System',
  },
  display: typographyStyles.display,
  title: typographyStyles.title,
  body: typographyStyles.body,
  label: typographyStyles.label,
});
