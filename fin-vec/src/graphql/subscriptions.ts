/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateFinRecord = /* GraphQL */ `subscription OnCreateFinRecord($filter: ModelSubscriptionFinRecordFilterInput) {
  onCreateFinRecord(filter: $filter) {
    id
    embedding
    ticker
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFinRecordSubscriptionVariables,
  APITypes.OnCreateFinRecordSubscription
>;
export const onUpdateFinRecord = /* GraphQL */ `subscription OnUpdateFinRecord($filter: ModelSubscriptionFinRecordFilterInput) {
  onUpdateFinRecord(filter: $filter) {
    id
    embedding
    ticker
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFinRecordSubscriptionVariables,
  APITypes.OnUpdateFinRecordSubscription
>;
export const onDeleteFinRecord = /* GraphQL */ `subscription OnDeleteFinRecord($filter: ModelSubscriptionFinRecordFilterInput) {
  onDeleteFinRecord(filter: $filter) {
    id
    embedding
    ticker
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFinRecordSubscriptionVariables,
  APITypes.OnDeleteFinRecordSubscription
>;
