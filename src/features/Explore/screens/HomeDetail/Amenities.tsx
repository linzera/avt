import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '~/components/Button';
import Typography from '~/components/Typography';

const styles = StyleSheet.create({
  container: {marginTop: 40},
  textContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 8,
  },
  item: {width: '50%', marginTop: 16},
  button: {maxWidth: 184, marginTop: 24},
});

interface Props {
  amenities: (string | null)[];
}

const AMENITIES_MAX_COUNT = 7;

export default function Amenities({amenities}: Props) {
  const [showAll, setShowAll] = useState(false);
  const isNotEmpty = amenities.length > 0;

  const sliceEnd = showAll ? amenities.length : AMENITIES_MAX_COUNT;

  return (
    <If condition={isNotEmpty}>
      <View style={styles.container}>
        <Typography color="primary" component="text24" fontType="medium">
          Amenities
        </Typography>
        <View style={styles.textContainer}>
          {amenities.slice(0, sliceEnd).map(amenity => (
            <Typography color="neutral" key={amenity} style={styles.item}>
              {amenity}
            </Typography>
          ))}
        </View>
        <Button
          onPress={() => setShowAll(!showAll)}
          style={styles.button}
          variant="outlined">
          <Button.Text fontType="medium">
            <Choose>
              <When condition={showAll}>View less</When>
              <Otherwise>View all {amenities.length} amenities</Otherwise>
            </Choose>
          </Button.Text>
        </Button>
      </View>
    </If>
  );
}
