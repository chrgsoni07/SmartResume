import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { Education } from '../resume/Resume';
import Title from './Title';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  school: {
    fontFamily: 'Lato Bold',
    fontSize: 10,
  },
  degree: {
    fontFamily: 'Lato',
    fontSize: 10,
  },
  candidate: {
    fontFamily: 'Lato Italic',
    fontSize: 10,
  },
});

function EducationDisplay({ education }: { education?: Education[] }) {
  if (!education) {
    return <p></p>;
  }
  return (
    <View style={styles.container}>
      <Title>Education</Title>
      {education.map((edu, eduIdx) => (
        <>
          <Text key={`school${eduIdx}`} style={styles.school}>
            {edu.university}
          </Text>
          <Text key={`degree${eduIdx}`} style={styles.degree}>
            {edu.degree}
          </Text>
          <Text key={`duration${eduIdx}`} style={styles.candidate}>
            {edu.duration}
          </Text>
        </>
      ))}
    </View>
  );
}

// const Education: React.FC = () => (
//   <View style={styles.container}>
//     <Title>Education</Title>
//     <Text style={styles.school}>Jedi Academy</Text>
//     <Text style={styles.degree}>Jedi Master</Text>
//     <Text style={styles.candidate}>A long, long time ago</Text>
//   </View>
// );
export default EducationDisplay;
