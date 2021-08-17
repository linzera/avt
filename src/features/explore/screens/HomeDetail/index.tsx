import React, {useRef, useState} from 'react';
// eslint-disable-next-line import/named
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';

import HomeInfo from '@explore/components/HomeInfo';
import HomeCharacteristics from '@explore/components/HomeCharacteristics';
import ImageWithPlaceholder from '@explore/components/ImageWithPlaceholder';
import NavigationHeader from '@explore/components/NavigationHeader';
import {ExploreStackParamList} from '@explore/navigation/routes';

import AnimatedSvgIcon, {shareD} from '~/components/AnimatedSvgIcon';
import colors from '~/theme/colors';

import {HomeQuery} from '~/graphql/generated/HomeQuery';
import Placeholder from './Placeholder';
import Description from './Description';
import Amenities from './Amenities';
import {useHomeDetailAnimation} from './use-home-detail-animation';
import GalleryModal from './GalleryModal';

type HomeDetailRouteProp = RouteProp<ExploreStackParamList, 'HomeDetail'>;

const styles = StyleSheet.create({
  navigationHeader: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
  },
  safeArea: {flex: 1, backgroundColor: colors.white100},
  contentScroll: {paddingBottom: 24},
  iconSpacing: {marginRight: 4},
  detailsContainer: {paddingHorizontal: 24},
});

const GET_HOME_QUERY = gql`
  query HomeQuery($id: UUID!) {
    home(id: $id) {
      description
      amenities
    }
  }
`;

const IMAGE_HEIGHT = 400;

export default function HomeDetail() {
  const imageListRef = useRef<FlatList>(null);
  const [isGalleryVisible, setGalleryVisible] = useState(false);
  const [lastPressedImageIndex, setLastPressedImageIndex] = useState(0);
  const dimensions = useWindowDimensions();
  const {headerAnimatedStyle, chevronProps, shareProps, variant, onScroll} =
    useHomeDetailAnimation();
  const {
    params: {
      id,
      cityName,
      regionName,
      stateCode,
      title,
      bathroomsCount,
      maxOccupancy,
      hasPool,
      photos,
      roomsCount,
    },
  } = useRoute<HomeDetailRouteProp>();

  const {loading, data} = useQuery<HomeQuery>(GET_HOME_QUERY, {
    variables: {
      id,
    },
  });

  function onChangeImageIndex(index: number) {
    imageListRef.current?.scrollToIndex({index, animated: false});
    setLastPressedImageIndex(index);
  }

  return (
    <>
      <View style={styles.navigationHeader}>
        <NavigationHeader
          title=""
          style={headerAnimatedStyle}
          iconAnimationProps={chevronProps}
          iconColor="white100"
          variant={variant}
          action={
            <TouchableOpacity style={styles.iconSpacing}>
              <AnimatedSvgIcon
                d={shareD}
                animatedProps={shareProps}
                fill="white100"
              />
            </TouchableOpacity>
          }
        />
      </View>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <Animated.ScrollView
          contentContainerStyle={styles.contentScroll}
          onScroll={onScroll}
          scrollEventThrottle={16}
          bounces={false}>
          <FlatList
            ref={imageListRef}
            horizontal
            pagingEnabled
            bounces={false}
            data={photos}
            keyExtractor={item => item?.url}
            renderItem={({item}) =>
              item && (
                <Pressable onPress={() => setGalleryVisible(true)}>
                  <ImageWithPlaceholder
                    uri={item.url}
                    style={{
                      height: IMAGE_HEIGHT,
                      width: dimensions.width,
                      backgroundColor: `${colors.primary}20`,
                    }}
                  />
                </Pressable>
              )
            }
          />
          <HomeInfo
            name={title}
            regionName={regionName}
            stateCode={stateCode}
            cityName={cityName}
          />
          <HomeCharacteristics>
            <HomeCharacteristics.Item item="rooms" count={roomsCount} />
            <HomeCharacteristics.Item item="bathrooms" count={bathroomsCount} />
            <If condition={hasPool}>
              <HomeCharacteristics.Item item="pool" />
            </If>
            <HomeCharacteristics.Item item="occupancy" count={maxOccupancy} />
          </HomeCharacteristics>
          <View style={styles.detailsContainer}>
            <Choose>
              <When condition={loading}>
                <Placeholder />
              </When>
              <Otherwise>
                <Description description={data?.home?.description} />
                <Amenities amenities={data?.home?.amenities ?? []} />
              </Otherwise>
            </Choose>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
      <GalleryModal
        photos={photos}
        onGoBack={() => setGalleryVisible(false)}
        visible={isGalleryVisible}
        currentImageIndex={lastPressedImageIndex}
        setCurrentImageIndex={onChangeImageIndex}
      />
    </>
  );
}
