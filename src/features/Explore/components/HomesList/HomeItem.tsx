import React, {useState} from 'react';
import {Image, View, StyleSheet, Pressable} from 'react-native';
import {gql} from '@apollo/client';
import {useHomeItemHeight} from '@explore/hooks/use-home-item-height';
import HomeInfo from '@explore/components/HomeInfo';
import HomeCharacteristics from '@explore/components/HomeCharacteristics';
import ImagePlaceholder from '@explore/assets/svg/img_placeholder.svg';
import colors from '~/theme/colors';
import {Home_fragment} from '~/graphql/generated/Home_fragment';
import Typography from '~/components/Typography';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  imgContainer: {
    flex: 1,
  },
  img: {
    flex: 1,
    backgroundColor: `${colors.primary}20`,
    borderRadius: 8,
  },
  imgPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
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

function HomeItem({
  photos,
  index,
  total,
  regionName,
  stateCode,
  title,
  cityName,
  isAnyDestination,
  bathroomsCount,
  hasPool,
  maxOccupancy,
  roomsCount,
}: Props) {
  const [isImagePlaceholderVisible, setImagePlaceholderVisibility] =
    useState(true);
  const itemHeight = useHomeItemHeight();

  const coverImgUri = photos[0]?.url ?? '';

  return (
    <Pressable
      onPress={() => {
        console.log('test');
      }}
      style={[styles.container, {height: itemHeight}]}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{
            uri: coverImgUri,
          }}
          accessibilityIgnoresInvertColors
          onLoadEnd={() => setImagePlaceholderVisibility(false)}
        />
        <If condition={isImagePlaceholderVisible}>
          <View style={styles.imgPlaceholder}>
            <ImagePlaceholder />
          </View>
        </If>
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
        location={`${regionName} • ${cityName}, ${stateCode}`}
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
        listOrder
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
