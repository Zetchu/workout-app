import React from 'react';
import { Text, TextProps } from 'react-native';
import { Link } from 'expo-router';
import { typography } from '../../foundations';

interface TypographyProps extends TextProps {
  variant?: keyof typeof typography;
  href?: any;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  style,
  href,
  ...props
}) => {
  const textStyle = typography[variant];

  if (href) {
    return (
      <Link
        href={href}
        style={[textStyle, style]}
        {...(props as any)}
      />
    );
  }

  return (
    <Text
      style={[textStyle, style]}
      {...props}
    />
  );
};
