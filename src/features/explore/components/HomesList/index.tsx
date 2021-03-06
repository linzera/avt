import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {SearchHomes} from '~/graphql/generated/SearchHomes';
import {useHomeItemHeight} from '@explore/hooks/use-home-item-height';
import {useSearchFilter} from '@explore/context/filter/Provider';
import LoadingView from '@explore/components/LoadingView';
import {GetHomesPricing} from '~/graphql/generated/GetHomesPricing';
import HomeItem from './HomeItem';
import EmptyState from './EmptyState';

const styles = StyleSheet.create({
  list: {
    marginTop: 24,
  },
});

interface Props {
  data?: SearchHomes;
  fetchMore: () => void;
  isLoading: boolean;
  pricingData?: GetHomesPricing;
}

export default function HomeList({
  isLoading,
  data,
  fetchMore,
  pricingData,
}: Props) {
  const {isAnyDestination} = useSearchFilter();
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
          maxToRenderPerBatch={4}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
          renderItem={({item, index}) =>
            item && (
              <HomeItem
                pricingData={pricingData?.homesPricing.find(
                  priceData => priceData?.homeId === item.id,
                )}
                isAnyDestination={isAnyDestination}
                index={index + 1}
                total={data?.homes.count ?? 0}
                {...item}
              />
            )
          }
          onEndReached={fetchMore}
          onEndReachedThreshold={4}
        />
      </Otherwise>
    </Choose>
  );
}
