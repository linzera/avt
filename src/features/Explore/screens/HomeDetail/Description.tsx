import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Typography from '~/components/Typography';

const styles = StyleSheet.create({
  spacing: {
    marginTop: 8,
  },
});

export default function Description(props: {description?: string}) {
  const [isExpanded, setExpanded] = useState(false);

  const suffix = isExpanded ? 'less' : 'more';

  return (
    <>
      <Typography numberOfLines={isExpanded ? undefined : 5} color="neutral">
        {props.description}
      </Typography>
      <Typography
        color="primary"
        fontType="medium"
        style={styles.spacing}
        onPress={() => setExpanded(!isExpanded)}>
        View {suffix}
      </Typography>
    </>
  );
}
