import React from "react";
import {
  Text,
  StyleSheet,
  TextStyle,
  StyleProp,
  TextProps,
} from "react-native";
import { colors, typographyStyles } from "../../foundations/index";

interface TypographyProps extends TextProps {
  variant?: "display" | "title" | "body" | "label";
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numberOfLines?: number;
}

export default function Typography({
  variant = "body",
  style,
  children,
  numberOfLines,
  ...rest // <-- Gather the rest of the props (e.g., onPress)
}: TypographyProps) {
  return (
    <Text
      style={[styles.base, styles[variant], style]}
      numberOfLines={numberOfLines}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.textMain,
    fontFamily: "System",
  },
  display: typographyStyles.display,
  title: typographyStyles.title,
  body: typographyStyles.body,
  label: typographyStyles.label,
});
