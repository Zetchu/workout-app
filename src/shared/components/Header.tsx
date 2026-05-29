import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../design/elements';
import { colors, spacing } from '../design/foundations';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Typography
        variant='header'
        style={styles.headerText}
      >
        {title}
      </Typography>
      <Typography
        variant='caption'
        style={styles.subtitleText}
      >
        Don't skip leg day. Let's get to work.
      </Typography>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.lg,
    width: '100%',
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#38bdf8',
  },
  headerText: {
    color: colors.surface,
  },
  subtitleText: {
    color: colors.textLight,
    marginTop: spacing.xs,
  },
});
