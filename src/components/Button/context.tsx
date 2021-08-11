import React, {createContext, PropsWithChildren, useContext} from 'react';
import {ButtonVariantProp, getDerivedChildrenColorByVariant} from './util';
import {Color} from '~/theme/colors';

const defaultValue: Record<string, Color> = {
  color: 'white100',
};

const ButtonContext = createContext(defaultValue);

interface ProviderProps {
  variant: ButtonVariantProp;
}

export function ButtonContextProvider({
  children,
  variant,
}: PropsWithChildren<ProviderProps>) {
  return (
    <ButtonContext.Provider
      value={{color: getDerivedChildrenColorByVariant(variant)}}>
      {children}
    </ButtonContext.Provider>
  );
}

export function useButtonContext() {
  return useContext(ButtonContext);
}
