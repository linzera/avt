/* eslint-disable jsx-control-statements/jsx-jcs-no-undef */

declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FunctionComponent<SvgProps>;
  export default content;
}

interface ConditionProps {
  condition: boolean | null | undefined;
}

declare const If: React.ComponentType<ConditionProps>;
declare const Choose: React.ComponentType;
declare const When: React.ComponentType<ConditionProps>;
declare const Otherwise: React.ComponentType;
