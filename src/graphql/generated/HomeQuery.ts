/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomeQuery
// ====================================================

export interface HomeQuery_home {
  __typename: "Home";
  description: string;
  amenities: (string | null)[];
}

export interface HomeQuery {
  home: HomeQuery_home | null;
}

export interface HomeQueryVariables {
  id: any;
}
