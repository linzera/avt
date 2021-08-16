import React from 'react';
import {StyleSheet, View} from 'react-native';
import Typography from '~/components/Typography';

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  location: {marginTop: 16},
  name: {marginTop: 4},
});

interface Props {
  name: string;
  location: string;
}

export default function HomeInfo(props: Props) {
  return (
    <View style={styles.textContainer}>
      <Typography color="accent" component="text14" style={styles.location}>
        {props.location}
      </Typography>
      <Typography
        color="primary"
        component="text20"
        fontType="bold"
        style={styles.name}>
        {props.name}
      </Typography>
    </View>
  );
}
