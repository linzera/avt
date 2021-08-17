import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import Typography from '~/components/Typography';

import BathIcon from '@explore/assets/svg/bath.svg';
import PoolIcon from '@explore/assets/svg/pool.svg';
import RoomsIcon from '@explore/assets/svg/rooms.svg';
import OccupancyIcon from '@explore/assets/svg/user.svg';

const styles = StyleSheet.create({
  details: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
    paddingHorizontal: 8,
    paddingBottom: Platform.select({ios: 16}),
    flexWrap: 'wrap',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const CHARACTERISTICS_MAPPING = {
  pool: {
    icon: <PoolIcon />,
    label: 'Pool',
  },
  bathrooms: {
    icon: <BathIcon />,
    label: 'Bathrooms',
  },
  occupancy: {
    icon: <OccupancyIcon />,
    label: '',
  },
  rooms: {
    icon: <RoomsIcon />,
    label: 'Bedrooms',
  },
};

interface Props {
  children?: React.ReactElement<ItemProps>[];
}

interface ItemProps {
  showLabel?: boolean;
  item: keyof typeof CHARACTERISTICS_MAPPING;
  count?: number;
}

const Item = ({showLabel, item, count}: ItemProps) => {
  const {icon, label} = CHARACTERISTICS_MAPPING[item];

  return (
    <View style={styles.item}>
      {icon}
      <Typography component="text12">
        <If condition={!!count}>{count}</If>
        <If condition={!!showLabel}> {label}</If>
      </Typography>
    </View>
  );
};

function HomeCharacteristics(props: Props) {
  return <View style={styles.details}>{props.children}</View>;
}

HomeCharacteristics.Item = Item;

export default HomeCharacteristics;
