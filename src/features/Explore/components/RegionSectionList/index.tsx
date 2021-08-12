import React, {useMemo} from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {useRegionFilter} from '@explore/hooks/use-region-filter';
import {extractSectionsFromRegionState} from './util';
import RegionSectionHeader from './SectionHeader';
import RegionListItem from './Item';
import SearchEmptyState from './SearchEmptyState';

const styles = StyleSheet.create({
  sectionList: {
    flex: 1,
  },
});

const SELECT_ALL_THRESHOLD = 2;

interface Props {
  query?: string;
}

export default function RegionSectionList({query}: Props) {
  const {
    toggleRegion,
    regions,
    clearFilters,
    selectManyRegions,
    isAnyDestination,
  } = useRegionFilter();

  const sections = useMemo(
    () => extractSectionsFromRegionState({regions, query}),
    [regions, query],
  );

  const isSearching = !!query;

  return (
    <SectionList
      sections={sections}
      keyExtractor={item => item.id}
      style={styles.sectionList}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({section: {title, data}}) => (
        <RegionSectionHeader
          title={title}
          onSelectAll={
            data.length > SELECT_ALL_THRESHOLD
              ? () => selectManyRegions(data)
              : undefined
          }
        />
      )}
      ListHeaderComponent={
        !isSearching ? (
          <RegionListItem
            onPress={clearFilters}
            name="Any destination"
            isSelected={isAnyDestination}
          />
        ) : undefined
      }
      ListEmptyComponent={isSearching ? <SearchEmptyState /> : undefined}
      renderItem={({item}) => (
        <RegionListItem onPress={() => toggleRegion(item)} {...item} />
      )}
    />
  );
}
