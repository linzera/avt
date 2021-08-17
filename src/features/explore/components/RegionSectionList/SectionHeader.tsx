import React from 'react';
import {StyleSheet, View} from 'react-native';
import Divider from '~/components/Divider';
import Typography from '~/components/Typography';

const styles = StyleSheet.create({
  container: {paddingHorizontal: 20, marginTop: 16},
  row: {flexDirection: 'row', marginBottom: 8, alignItems: 'center'},
  select: {marginLeft: 8},
});

interface Props {
  title: string;
  onSelectAll?: () => void;
}

export default function SectionHeader({title, onSelectAll}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Typography component="text18" color="primary" fontType="medium">
          {title}
        </Typography>
        {onSelectAll && (
          <Typography
            component="text14"
            color="accent"
            style={styles.select}
            onPress={onSelectAll}>
            select all
          </Typography>
        )}
      </View>
      <Divider />
    </View>
  );
}
