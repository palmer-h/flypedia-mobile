import React from 'react';
import { Linking, Text, View } from 'react-native';
import styles from './styles';
import { PROJECT_URL } from './constants';

const AboutAppScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={[styles.text, styles.titleText]}>Flypedia</Text>
    <Text style={styles.text}>
      A project to document the world's fishing flies
    </Text>
    <Text
      style={[styles.text, styles.linkText]}
      accessibilityHint="opens project website"
      onPress={() => Linking.openURL(PROJECT_URL)}>
      {PROJECT_URL}
    </Text>
  </View>
);

export default AboutAppScreen;
