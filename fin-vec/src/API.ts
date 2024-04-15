/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateFinRecordInput = {
  id?: string | null,
  embedding: Array< number >,
  ticker: string,
};

export type ModelFinRecordConditionInput = {
  embedding?: ModelFloatInput | null,
  ticker?: ModelStringInput | null,
  and?: Array< ModelFinRecordConditionInput | null > | null,
  or?: Array< ModelFinRecordConditionInput | null > | null,
  not?: ModelFinRecordConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type FinRecord = {
  __typename: "FinRecord",
  id: string,
  embedding: Array< number >,
  ticker: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateFinRecordInput = {
  id: string,
  embedding?: Array< number > | null,
  ticker?: string | null,
};

export type DeleteFinRecordInput = {
  id: string,
};

export type ModelFinRecordFilterInput = {
  id?: ModelIDInput | null,
  embedding?: ModelFloatInput | null,
  ticker?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelFinRecordFilterInput | null > | null,
  or?: Array< ModelFinRecordFilterInput | null > | null,
  not?: ModelFinRecordFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelFinRecordConnection = {
  __typename: "ModelFinRecordConnection",
  items:  Array<FinRecord | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionFinRecordFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  embedding?: ModelSubscriptionFloatInput | null,
  ticker?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionFinRecordFilterInput | null > | null,
  or?: Array< ModelSubscriptionFinRecordFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateFinRecordMutationVariables = {
  input: CreateFinRecordInput,
  condition?: ModelFinRecordConditionInput | null,
};

export type CreateFinRecordMutation = {
  createFinRecord?:  {
    __typename: "FinRecord",
    id: string,
    embedding: Array< number >,
    ticker: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFinRecordMutationVariables = {
  input: UpdateFinRecordInput,
  condition?: ModelFinRecordConditionInput | null,
};

export type UpdateFinRecordMutation = {
  updateFinRecord?:  {
    __typename: "FinRecord",
    id: string,
    embedding: Array< number >,
    ticker: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFinRecordMutationVariables = {
  input: DeleteFinRecordInput,
  condition?: ModelFinRecordConditionInput | null,
};

export type DeleteFinRecordMutation = {
  deleteFinRecord?:  {
    __typename: "FinRecord",
    id: string,
    embedding: Array< number >,
    ticker: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetFinRecordQueryVariables = {
  id: string,
};

export type GetFinRecordQuery = {
  getFinRecord?:  {
    __typename: "FinRecord",
    id: string,
    embedding: Array< number >,
    ticker: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFinRecordsQueryVariables = {
  filter?: ModelFinRecordFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFinRecordsQuery = {
  listFinRecords?:  {
    __typename: "ModelFinRecordConnection",
    items:  Array< {
      __typename: "FinRecord",
      id: string,
      embedding: Array< number >,
      ticker: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateFinRecordSubscriptionVariables = {
  filter?: ModelSubscriptionFinRecordFilterInput | null,
};

export type OnCreateFinRecordSubscription = {
  onCreateFinRecord?:  {
    __typename: "FinRecord",
    id: string,
    embedding: Array< number >,
    ticker: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFinRecordSubscriptionVariables = {
  filter?: ModelSubscriptionFinRecordFilterInput | null,
};

export type OnUpdateFinRecordSubscription = {
  onUpdateFinRecord?:  {
    __typename: "FinRecord",
    id: string,
    embedding: Array< number >,
    ticker: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFinRecordSubscriptionVariables = {
  filter?: ModelSubscriptionFinRecordFilterInput | null,
};

export type OnDeleteFinRecordSubscription = {
  onDeleteFinRecord?:  {
    __typename: "FinRecord",
    id: string,
    embedding: Array< number >,
    ticker: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
