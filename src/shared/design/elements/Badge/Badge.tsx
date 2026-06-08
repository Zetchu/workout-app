import React from 'react';
import { View, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { spacing, shapes } from '../../foundations/index';
import Typography from '../Typography/index';

interface BadgeProps extends ViewProps {
  label: string;
  backgroundColor: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  backgroundColor,
  textColor,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: shapes.radiusPill,
          paddingHorizontal: spacing.md,
          paddingVertical: 6,
          alignSelf: 'flex-start',
        },
        style,
      ]}
      {...props}
    >
      <Typography
        variant='label'
        style={[
          { fontWeight: '700', textTransform: 'uppercase', fontSize: 11 },
          textColor ? { color: textColor } : undefined,
        ]}
      >
        {label}
      </Typography>
    </View>
  );
};

export default Badge;
