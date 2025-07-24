import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type ButtonProps = {
  texts: string;
  onPress: () => void;
};

export default function Button({ texts, onPress }: ButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{texts}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 90,
    borderRadius: 52,
  },
  buttonText: {
    color: '#1C58F2',
    fontSize: 16,
    fontFamily: 'JosefinSans-Regular',
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
  },
});
