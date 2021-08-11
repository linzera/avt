import React, {PropsWithChildren} from 'react';
import Typography, {TypographyProps} from '../Typography';
import {useButtonContext} from './context';

export default function Text(props: PropsWithChildren<TypographyProps>) {
  const {color} = useButtonContext();

  return <Typography component="body" color={color} {...props} />;
}
