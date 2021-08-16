/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Home_fragment
// ====================================================

export interface Home_fragment_photos {
  __typename: "HomePhoto";
  listOrder: number;
  url: string;
}

export interface Home_fragment {
  __typename: "Home";
  id: any;
  title: string;
  photos: (Home_fragment_photos | null)[];
  roomsCount: number;
  bathroomsCount: number;
  maxOccupancy: number;
  hasPool: boolean;
  regionName: string;
  cityName: string;
  stateCode: string;
}
