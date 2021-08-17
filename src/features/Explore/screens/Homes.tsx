import React, {useMemo, useRef} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Typography from '~/components/Typography';
import Button from '~/components/Button';
import colors from '~/theme/colors';

import HomeList from '@explore/components/HomesList';
import FooterFilter from '@explore/components/HomesList/Footer';
import SearchFilter from '@explore/components/SearchFilter';
import ClearButton from '@explore/components/ClearFilterButton';
import CloseIcon from '@explore/assets/svg/close.svg';
import {useSearchFilter} from '@explore/context/filter/Provider';
import {useSearchHomesPaginationQuery} from '@explore/hooks/use-search-homes-query';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white100,
  },
  sheetContainer: {paddingHorizontal: 24},
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    height: 44,
  },
  sheetTitle: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
});

export default function Homes() {
  const {data, loading, refetch, loadMore} = useSearchHomesPaginationQuery();
  const {filtersAppliedCount, clearFilters} = useSearchFilter();
  const filterSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['40%'], []);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar animated barStyle="dark-content" />
        <HomeList data={data} isLoading={loading} fetchMore={loadMore} />
        <FooterFilter
          refetch={refetch}
          onFilterPress={() => filterSheetRef.current?.present()}
        />
        <BottomSheetModal
          index={0}
          ref={filterSheetRef}
          snapPoints={snapPoints}
          onDismiss={refetch}>
          <View style={styles.sheetContainer}>
            <View style={styles.sheetHeader}>
              <Button
                variant="icon"
                onPress={() => filterSheetRef.current?.close()}>
                <CloseIcon />
              </Button>
              <View style={styles.sheetTitle}>
                <Typography
                  color="primary"
                  component="text18"
                  fontType="medium">
                  Filter Homes
                </Typography>
              </View>
              <If condition={!!filtersAppliedCount}>
                <ClearButton onPress={clearFilters} />
              </If>
            </View>
            <SearchFilter
              showPeriod={false}
              submitTitle="Search"
              onSubmit={() => filterSheetRef.current?.close()}
            />
          </View>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}
