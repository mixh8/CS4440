/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getFinRecord = /* GraphQL */ `query GetFinRecord($id: ID!) {
  getFinRecord(id: $id) {
    id
    embedding
    ticker
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetFinRecordQueryVariables,
  APITypes.GetFinRecordQuery
>;
export const listFinRecords = /* GraphQL */ `query ListFinRecords(
  $filter: ModelFinRecordFilterInput
  $limit: Int
  $nextToken: String
) {
  listFinRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      embedding
      ticker
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListFinRecordsQueryVariables,
  APITypes.ListFinRecordsQuery
>;
