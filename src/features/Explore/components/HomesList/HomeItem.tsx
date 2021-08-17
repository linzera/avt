import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {gql} from '@apollo/client';
import {useHomeItemHeight} from '@explore/hooks/use-home-item-height';
import HomeInfo from '@explore/components/HomeInfo';
import HomeCharacteristics from '@explore/components/HomeCharacteristics';

import colors from '~/theme/colors';
import {Home_fragment} from '~/graphql/generated/Home_fragment';
import Typography from '~/components/Typography';
import {useNavigation} from '@react-navigation/native';
import routes from '../../navigation/routes';
import ImageWithPlaceholder from '../ImageWithPlaceholder';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  imgContainer: {
    flex: 1,
  },
  imgHeader: {...StyleSheet.absoluteFillObject, alignItems: 'center'},
  imgHeaderContainer: {
    backgroundColor: colors.white100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 4,
    borderBottomEndRadius: 4,
    shadowColor: colors.black100,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

interface Props extends Home_fragment {
  total: number;
  index: number;
  isAnyDestination: boolean;
}

function HomeItem({total, index, isAnyDestination, ...rest}: Props) {
  const itemHeight = useHomeItemHeight();
  const navigation = useNavigation();

  const {
    photos,
    regionName,
    stateCode,
    title,
    cityName,
    bathroomsCount,
    hasPool,
    maxOccupancy,
    roomsCount,
  } = rest;

  const coverImgUri = photos[0]?.url ?? '';

  function onPress() {
    navigation.navigate(routes.homeDetail, {
      ...rest,
    });
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, {height: itemHeight}]}>
      <View style={styles.imgContainer}>
        <ImageWithPlaceholder uri={coverImgUri} />
        <View style={styles.imgHeader}>
          <View style={styles.imgHeaderContainer}>
            <Typography>
              <Typography color="primary" fontType="bold">
                {index}
              </Typography>{' '}
              of{' '}
              <Typography color="primary" fontType="bold">
                {total}
              </Typography>{' '}
              homes{' '}
              <Typography color="primary" fontType="bold">
                in{' '}
                <Choose>
                  <When condition={isAnyDestination}>any destination</When>
                  <Otherwise>{regionName}</Otherwise>
                </Choose>
              </Typography>
            </Typography>
          </View>
        </View>
      </View>
      <HomeInfo
        name={title}
        regionName={regionName}
        stateCode={stateCode}
        cityName={cityName}
      />
      <HomeCharacteristics>
        <HomeCharacteristics.Item item="rooms" count={roomsCount} showLabel />
        <HomeCharacteristics.Item
          item="bathrooms"
          count={bathroomsCount}
          showLabel
        />
        <If condition={hasPool}>
          <HomeCharacteristics.Item item="pool" showLabel />
        </If>
        <HomeCharacteristics.Item item="occupancy" count={maxOccupancy} />
      </HomeCharacteristics>
    </Pressable>
  );
}

HomeItem.fragments = {
  home: gql`
    fragment Home_fragment on Home {
      id
      title
      photos {
        url
      }
      roomsCount
      bathroomsCount
      maxOccupancy
      hasPool
      regionName
      cityName
      stateCode
    }
  `,
};

export default HomeItem;
