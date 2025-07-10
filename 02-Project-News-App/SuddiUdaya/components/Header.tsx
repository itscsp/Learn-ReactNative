import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Header = () => (
  <View style={styles.header}>
    <View style={styles.headerContent}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.logoIcon}
          accessibilityLabel="SuddiUdaya Logo"
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingVertical: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 120,
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    height: 120,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
  logoIcon: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
});

export default Header;
