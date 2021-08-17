/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookingPeriod } from "./globalTypes";

// ====================================================
// GraphQL query operation: SearchHomes
// ====================================================

export interface SearchHomes_homes_results_photos {
  __typename: "HomePhoto";
  url: string;
}

export interface SearchHomes_homes_results {
  __typename: "Home";
  id: any;
  title: string;
  photos: (SearchHomes_homes_results_photos | null)[];
  roomsCount: number;
  bathroomsCount: number;
  maxOccupancy: number;
  hasPool: boolean;
  regionName: string;
  cityName: string;
  stateCode: string;
}

export interface SearchHomes_homes {
  __typename: "PaginatedHomes";
  results: (SearchHomes_homes_results | null)[];
  count: number;
}

export interface SearchHomes {
  homes: SearchHomes_homes;
}

export interface SearchHomesVariables {
  period?: BookingPeriod | null;
  guests?: number | null;
  region?: any | null;
  page?: number | null;
  pageSize?: number | null;
}
