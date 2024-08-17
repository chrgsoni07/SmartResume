import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { Projects } from '../resume/Resume';
import List, { Item } from './List';
import Title from './Title';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 5,
    '@media max-width: 400': {
      paddingTop: 10,
      paddingLeft: 0,
    },
  },
  entryContainer: {
    marginBottom: 10,
  },
  date: {
    fontSize: 11,
    fontFamily: 'Lato Italic',
  },
  detailLeftColumn: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  detailRightColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  bulletPoint: {
    fontSize: 10,
    textAlign: 'justify',
  },
  details: {
    fontSize: 10,
    fontFamily: 'Lato',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-end',
    justifySelf: 'flex-end',
  },
  title: {
    fontSize: 11,
    color: 'black',
    textDecoration: 'none',
    fontFamily: 'Lato Bold',
  },
});

interface projectDataProps {
  name: string;
  description: string;
  technologies: string[];
}
const ProjectEntry: React.FC<projectDataProps> = ({ name, description, technologies }) => {
  const title = `${name}`;
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{description}</Text>
        </View>
      </View>
      <List>
        {technologies.map((detail, index) => (
          <Item key={index}>{detail}</Item>
        ))}
      </List>
    </View>
  );
};

function Project({ project }: { project?: Projects[] }) {
  if (!project) {
    return <p></p>;
  }
  return (
    <View style={styles.container}>
      <Title>Experience</Title>
      {project.map(({ name, description, technologies }) => (
        <ProjectEntry name={name} description={description} technologies={technologies} />
      ))}
    </View>
  );
}

export default Project;
