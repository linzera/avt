/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RegionsQuery
// ====================================================

export interface RegionsQuery_regions {
  __typename: "Region";
  id: any;
  stateName: string;
  name: string;
}

export interface RegionsQuery {
  regions: (RegionsQuery_regions | null)[];
}
