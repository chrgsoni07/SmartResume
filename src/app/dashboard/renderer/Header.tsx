import React from 'react';
import { Link, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Lato Bold',
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
    fontFamily: 'Lato',
  },
  mobile: {
    fontSize: 10,
    justifySelf: 'flex-end',
    fontFamily: 'Lato',
    alignSelf: 'flex-end',
  },
  link: {
    fontFamily: 'Lato',
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
});

const Header = ({
  uname,
  jobTitle,
  email,
  phoneNo,
}: {
  uname: string;
  jobTitle: string;
  email: string;
  phoneNo: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailColumn}>
        <Text style={styles.name}>{uname}</Text>
        <Text style={styles.subtitle}>{jobTitle}</Text>
      </View>
      <View style={styles.linkColumn}>
        <Link href={`mailto:${email}`} style={styles.link}>
          {email}
        </Link>
        <Text style={styles.mobile}>{phoneNo}</Text>
      </View>
    </View>
  );
}

export default Header;
