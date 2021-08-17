import React, {PropsWithChildren} from 'react';
import Typography, {TypographyProps} from '~/components/Typography';
import {useButtonContext} from './context';

export default function Text(props: PropsWithChildren<TypographyProps>) {
  const {color} = useButtonContext();

  return (
    <Typography component="text16" fontType="medium" color={color} {...props} />
  );
}
