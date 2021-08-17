import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Typography from '~/components/Typography';
import {TypographyComponent} from '~/components/Typography/util';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  label: {
    marginBottom: 4,
  },
  placeholder: {
    opacity: 0.3,
  },
});

interface Props {
  label: string;
  value?: string;
  placeholder: string;
  onPress: () => void;
  onValueChange?: () => void;
  dense?: boolean;
}

export default function SearchInput({
  label,
  placeholder,
  value,
  onPress,
  onValueChange,
  dense,
}: Props) {
  const [labelTypography, valueTypography]: TypographyComponent[] = dense
    ? ['text12', 'text14']
    : ['text16', 'text16'];

  useEffect(() => {
    if (onValueChange) {
      onValueChange();
    }
  }, [value, onValueChange]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Typography
        component={labelTypography}
        fontType="medium"
        color="accent"
        style={!dense && styles.label}>
        {label}
      </Typography>
      <Choose>
        <When condition={!!value}>
          <Typography
            component={valueTypography}
            numberOfLines={1}
            color="neutral">
            {value}
          </Typography>
        </When>
        <Otherwise>
          <Typography
            component={valueTypography}
            style={styles.placeholder}
            color="primary">
            {placeholder}
          </Typography>
        </Otherwise>
      </Choose>
    </TouchableOpacity>
  );
}
