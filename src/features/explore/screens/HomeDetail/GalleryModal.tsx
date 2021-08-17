import React from 'react';
import {
  Modal,
  StatusBar,
  View,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

import {Home_fragment_photos} from '~/graphql/generated/Home_fragment';
import colors from '~/theme/colors';
import ImageWithPlaceholder from '@explore/components/ImageWithPlaceholder';
import NavigationHeader from '@explore/components/NavigationHeader';
import Typography from '~/components/Typography';

const styles = StyleSheet.create({
  rowImage: {width: 90, height: 64, borderRadius: 2},
  selected: {
    borderColor: colors.accent,
    borderWidth: 3,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white100,
    justifyContent: 'center',
  },
  preview: {height: '70%', paddingHorizontal: 24, marginBottom: 24},
});

interface Props {
  visible: boolean;
  onGoBack: () => void;
  photos: (Home_fragment_photos | null)[];
  currentImageIndex: number;
  setCurrentImageIndex: (index: number) => void;
}

export default function GalleryModal({
  visible,
  onGoBack,
  photos,
  currentImageIndex,
  setCurrentImageIndex,
}: Props) {
  const dimensions = useWindowDimensions();

  const currentPhoto = photos[currentImageIndex] || {url: ''};

  function renderItem(render: {
    item: Home_fragment_photos | null;
    index: number;
  }) {
    const uri = render.item?.url ?? '';
    const isSelected = currentImageIndex === render.index;

    return (
      <ImageWithPlaceholder
        style={[styles.rowImage, isSelected && styles.selected]}
        uri={uri}
        showLogo={false}
      />
    );
  }

  return (
    <Modal
      visible={visible}
      animated
      animationType="fade"
      hardwareAccelerated
      presentationStyle="overFullScreen">
      <>
        <StatusBar animated barStyle="dark-content" />
        <NavigationHeader
          onPress={onGoBack}
          title=""
          action={
            <Typography color="primary" fontType="medium">
              {currentImageIndex + 1}/{photos.length}
            </Typography>
          }
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.preview}>
            <ImageWithPlaceholder uri={currentPhoto.url} />
          </View>
          <Carousel
            initialScrollIndex={currentImageIndex}
            firstItem={currentImageIndex}
            data={photos}
            renderItem={renderItem}
            sliderWidth={dimensions.width}
            itemWidth={90}
            onSnapToItem={setCurrentImageIndex}
          />
        </SafeAreaView>
      </>
    </Modal>
  );
}
