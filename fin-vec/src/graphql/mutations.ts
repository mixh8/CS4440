/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createFinRecord = /* GraphQL */ `mutation CreateFinRecord(
  $input: CreateFinRecordInput!
  $condition: ModelFinRecordConditionInput
) {
  createFinRecord(input: $input, condition: $condition) {
    id
    embedding
    ticker
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFinRecordMutationVariables,
  APITypes.CreateFinRecordMutation
>;
export const updateFinRecord = /* GraphQL */ `mutation UpdateFinRecord(
  $input: UpdateFinRecordInput!
  $condition: ModelFinRecordConditionInput
) {
  updateFinRecord(input: $input, condition: $condition) {
    id
    embedding
    ticker
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateFinRecordMutationVariables,
  APITypes.UpdateFinRecordMutation
>;
export const deleteFinRecord = /* GraphQL */ `mutation DeleteFinRecord(
  $input: DeleteFinRecordInput!
  $condition: ModelFinRecordConditionInput
) {
  deleteFinRecord(input: $input, condition: $condition) {
    id
    embedding
    ticker
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteFinRecordMutationVariables,
  APITypes.DeleteFinRecordMutation
>;
