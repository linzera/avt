import React from 'react';
import {StyleSheet, View} from 'react-native';
import Typography from '~/components/Typography';
import {SearchHomes_homes_results} from '~/graphql/generated/SearchHomes';

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  location: {marginTop: 16},
  name: {marginTop: 4},
});

interface Props
  extends Pick<
    SearchHomes_homes_results,
    'regionName' | 'cityName' | 'stateCode'
  > {
  name: string;
}

export default function HomeInfo({
  regionName,
  cityName,
  stateCode,
  name,
}: Props) {
  return (
    <View style={styles.textContainer}>
      <Typography color="accent" component="text14" style={styles.location}>
        {regionName} • {cityName}, {stateCode}
      </Typography>
      <Typography
        color="primary"
        component="text20"
        fontType="bold"
        style={styles.name}>
        {name}
      </Typography>
    </View>
  );
}
