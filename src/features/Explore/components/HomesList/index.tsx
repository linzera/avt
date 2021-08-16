import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useHomeItemHeight} from '@explore/hooks/use-home-item-height';
import {useSearchHomesPaginationQuery} from '@explore/hooks/use-search-homes-query';
import {useRegionFilter} from '@explore/hooks/use-region-filter';
import LoadingView from '../LoadingView';
import HomeItem from './HomeItem';
import EmptyState from './EmptyState';
import {SearchHomes} from '~/graphql/generated/SearchHomes';

const styles = StyleSheet.create({
  list: {
    marginTop: 24,
  },
});

interface Props {
  data?: SearchHomes;
  isLoading: boolean;
}

export default function HomeList({isLoading, data}: Props) {
  const {isAnyDestination} = useRegionFilter();
  const itemHeight = useHomeItemHeight();

  return (
    <Choose>
      <When condition={isLoading}>
        <LoadingView />
      </When>
      <Otherwise>
        <FlatList
          style={[styles.list, {height: itemHeight, maxHeight: itemHeight}]}
          data={data?.homes.results || []}
          snapToAlignment="start"
          decelerationRate="fast"
          initialNumToRender={5}
          snapToInterval={itemHeight}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
          keyExtractor={item => item?.id}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
          renderItem={({item, index}) =>
            item && (
              <HomeItem
                isAnyDestination={isAnyDestination}
                index={index + 1}
                total={data?.homes.count ?? 0}
                {...item}
              />
            )
          }
        />
      </Otherwise>
    </Choose>
  );
}
