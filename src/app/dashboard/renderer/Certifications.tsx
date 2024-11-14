// src/Skills.tsx
import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

import List, { Item } from './List';
import Title from './Title';

const Certifications = ({ certifications }: { certifications?: string[] }) => {
  if (!certifications || certifications.length === 0) {
    return null; // If no certifications, return nothing
  }
  return (
    <View>
      <Title>Certifications</Title>
      <List>
        {certifications.map((cert, index) => (
          <Item key={index}>{cert}</Item>
        ))}
      </List>
    </View>
  );
};
export default Certifications;
