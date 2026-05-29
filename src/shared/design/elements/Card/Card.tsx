import React from 'react';
import { View, ViewProps } from 'react-native';
import { colors, shapes } from '../../foundations';

export const Card: React.FC<ViewProps> = ({ style, ...props }) => {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: shapes.radiusMedium,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
      {...props}
    />
  );
};
