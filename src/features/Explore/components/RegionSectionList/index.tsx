import React, {useMemo} from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {RegionState} from '@explore/context/filter/types';
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
  regions: RegionState[];
  query?: string;
  onToggle: (region: RegionState) => void;
  onToggleMany: (regions: RegionState[]) => void;
  onClear: () => void;
  isAnyDestination: boolean;
}

export default function RegionSectionList({
  query,
  regions,
  onToggle,
  onToggleMany,
  onClear,
  isAnyDestination,
}: Props) {
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
      keyboardShouldPersistTaps="handled"
      renderSectionHeader={({section: {title, data}}) => (
        <RegionSectionHeader
          title={title}
          onSelectAll={
            data.length > SELECT_ALL_THRESHOLD
              ? () => onToggleMany(data)
              : undefined
          }
        />
      )}
      ListHeaderComponent={
        <If condition={!isSearching}>
          <RegionListItem
            onPress={onClear}
            name="Any destination"
            isSelected={isAnyDestination}
          />
        </If>
      }
      ListEmptyComponent={
        <If condition={isSearching}>
          <SearchEmptyState />
        </If>
      }
      renderItem={({item}) => (
        <RegionListItem onPress={() => onToggle(item)} {...item} />
      )}
    />
  );
}
