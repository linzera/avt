import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Typography from '~/components/Typography';
import colors from '~/theme/colors';
import CheckboxSelected from '@explore/assets/svg/selected.svg';
import CheckboxUnselected from '@explore/assets/svg/unselected.svg';
import {Region} from '@explore/context/types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  label: {
    marginLeft: 8,
    opacity: 0.7,
  },
  selected: {
    opacity: 1,
  },
});

interface Props extends Pick<Region, 'name'> {
  isSelected: boolean;
  onPress: () => void;
}

export default function RegionListItem({name, isSelected, onPress}: Props) {
  return (
    <Pressable
      android_ripple={{borderless: false, color: colors.gray100}}
      onPress={onPress}
      style={styles.container}>
      <Choose>
        <When condition={isSelected}>
          <CheckboxSelected />
        </When>
        <Otherwise>
          <CheckboxUnselected />
        </Otherwise>
      </Choose>
      <Typography style={[styles.label, isSelected && styles.selected]}>
        {name}
      </Typography>
    </Pressable>
  );
}
