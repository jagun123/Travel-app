// MessageBubble.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = ({ text, type }) => {
  return (
    <View style={[styles.container, type === 'explore' ? styles.rightBubble : styles.leftBubble]}>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  leftBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#DCF8C6',
  },
  rightBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    color: '#fff',
  },
});

export default MessageBubble;
