import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Divider from '~/components/Divider';
import Typography from '~/components/Typography';
import colors from '~/theme/colors';

import {useSearchFilter} from '@explore/context/filter/Provider';
import SearchInput from '@explore/components/SearchFilter/SearchFilterInput';
import FilterIcon from '@explore/assets/svg/filter_icon.svg';
import routes from '@explore/navigation/routes';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: colors.white100,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: `${colors.primary}15`,
    borderRadius: 4,
    marginHorizontal: 24,
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 12,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  filterWrapper: {
    flex: 1,
  },
  divider: {marginVertical: 8},
  badge: {
    position: 'absolute',
    top: 4,
    right: -8,
    backgroundColor: colors.primary,
    borderRadius: 60,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Footer(props: {
  onFilterPress: () => void;
  refetch: () => void;
}) {
  const {navigate} = useNavigation();
  const {formattedPeriod, filtersAppliedCount} = useSearchFilter();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.filterWrapper}>
          <SearchInput
            dense
            label="When"
            placeholder="Select dates to see prices..."
            value={formattedPeriod}
            onPress={() => navigate(routes.period)}
            onValueChange={props.refetch}
          />
        </View>
        <Divider horizontal style={styles.divider} />
        <TouchableOpacity
          onPress={props.onFilterPress}
          style={styles.iconButton}>
          <FilterIcon />
          <If condition={filtersAppliedCount > 0}>
            <View style={styles.badge}>
              <Typography fontType="medium" color="white100" component="text12">
                {filtersAppliedCount}
              </Typography>
            </View>
          </If>
        </TouchableOpacity>
      </View>
    </View>
  );
}
