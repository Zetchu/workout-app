import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
      <Text style={styles.subtitleText}>
        Don't skip leg day. Let's get to work.
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 16,
    width: '100%',
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#38bdf8',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitleText: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
});
