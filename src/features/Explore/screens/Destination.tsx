import React from 'react';
import {SectionList, StyleSheet, View} from 'react-native';
import FilterView from '@explore/components/FilterView';
import NavigationHeader from '@explore/components/NavigationHeader';

const styles = StyleSheet.create({
  sectionList: {
    flex: 1,
  },
});

export default function DestinationScreen() {
  return (
    <>
      <NavigationHeader title="Where" />
      <FilterView onSubmit={() => undefined}>
        <SectionList
          sections={[]}
          style={styles.sectionList}
          renderItem={() => <View />}
        />
      </FilterView>
    </>
  );
}
