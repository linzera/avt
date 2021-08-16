import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SearchInput from '@explore/components/SearchFilter/SearchFilterInput';
import Divider from '~/components/Divider';
import FilterIcon from '@explore/assets/svg/filter_icon.svg';
import colors from '~/theme/colors';
import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';
import {useSearchFilter} from '../../context/filter/Provider';

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
});

export default function Footer(props: {
  onFilterPress: () => void;
  refetch: () => void;
}) {
  const {navigate} = useNavigation();
  const {formattedPeriod} = useSearchFilter();

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
        </TouchableOpacity>
      </View>
    </View>
  );
}
