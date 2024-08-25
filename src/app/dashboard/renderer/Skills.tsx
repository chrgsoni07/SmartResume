// src/Skills.tsx
import React from 'react';
import { textAlign } from '@mui/system';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

import List, { Item } from './List';
import Title from './Title';

// Define the types for SkillEntry props
interface SkillEntryProps {
  name: string;
  skills: string[];
}

// Define the styles
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Lato Bold',
    fontSize: 11,
    marginBottom: 10,
  },
  skills: {
    fontFamily: 'Lato',
    fontSize: 10,
    marginBottom: 10,
    textAlign: 'justify',
  },
  skills_comma: {
    fontFamily: 'Lato',
    fontSize: 10,
    marginBottom: 10,
    textAlign: 'justify',
    hyphens: 'none',
    WebkitHyphens: 'none',
    msHyphens: 'none',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  },
});

// SkillEntry component
const SkillEntry: React.FC<SkillEntryProps> = ({ name, skills }) => (
  <View>
    <Text style={styles.title}>{name}</Text>
    <List>
      {skills.map((skill) => (
        <Item key={skill}>{skill}</Item>
      ))}
    </List>
  </View>
);

// Skills component
function Skills({ skills }: { skills?: String[] }) {
  if (!skills) {
    return <p></p>;
  } else if (skills.length > 12) {
    return (
      <View>
        <Title>Skills</Title>
        <Text style={styles.skills}>{skills.join(', ')}</Text>;
      </View>
    );
  } else
    return (
      <View>
        <Title>Skills</Title>
        <List>
          {skills.map((skill, index) => (
            <Item key={index}>{skill}</Item>
          ))}
        </List>
      </View>
    );
}

// // Skills component
// function Skills({ skills }: { skills?: String[] }) {
//   return (
//     <View>
//       <Title>Skills</Title>
//       <SkillEntry
//         name="Combat Abilities"
//         skills={[
//           'Completed Jedi Master training and built a lightsaber from scratch in order to do battle against the Empire',
//           'Defeated the Rancor and rescued Princess Leia from Jabba the Hutt',
//           'Competent fighter pilot as well as an excellent shot with nearly any weapon',
//         ]}
//       />
//     </View>
//   );
// }

export default Skills;
