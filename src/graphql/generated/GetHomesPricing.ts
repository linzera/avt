/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookingPeriod } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetHomesPricing
// ====================================================

export interface GetHomesPricing_homesPricing {
  __typename: "HomePricing";
  homeId: any;
  total: number;
}

export interface GetHomesPricing {
  homesPricing: (GetHomesPricing_homesPricing | null)[];
}

export interface GetHomesPricingVariables {
  period: BookingPeriod;
  ids: (any | null)[];
}
