import React from 'react';
import { View, ViewProps } from 'react-native';
import { spacing, shapes } from '../../foundations';
import { Typography } from '../Typography';

interface BadgeProps extends ViewProps {
  label: string;
  backgroundColor: string;
  textColor?: string;
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
          paddingVertical: spacing.sm 
        }, 
        style
      ]} 
      {...props}
    >
      <Typography 
        variant="caption" 
        style={[
          { fontWeight: '500', textTransform: 'capitalize' }, 
          textColor ? { color: textColor } : undefined
        ]}
      >
        {label}
      </Typography>
    </View>
  );
};
