import { GraphQLClient, RequestOptions } from 'graphql-request'
import gql from 'graphql-tag'
import { ClientError } from 'graphql-request/dist/types'
import useSWR, {
  SWRConfiguration as SWRConfigInterface,
  Key as SWRKeyInterface,
} from 'swr'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Item = {
  __typename?: 'Item'
  /** The unique ID of the Item */
  id: Scalars['ID']['output']
  /** Any text. */
  text: Scalars['String']['output']
}

export type Query = {
  __typename?: 'Query'
  items: Array<Item>
  status: Status
}

export enum State {
  Healthy = 'healthy',
  Unhealthy = 'unhealthy',
}

export type Status = {
  __typename?: 'Status'
  /** The service environment of BFF */
  environment: Scalars['String']['output']
  /** The service name of BFF */
  name: Scalars['String']['output']
  /** The state of BFF */
  state: State
  /** The semantic version of BFF */
  version: Scalars['String']['output']
}

export type ItemsQueryQueryVariables = Exact<{ [key: string]: never }>

export type ItemsQueryQuery = {
  __typename?: 'Query'
  items: Array<{ __typename?: 'Item'; id: string; text: string }>
}

export type StatusQueryQueryVariables = Exact<{ [key: string]: never }>

export type StatusQueryQuery = {
  __typename?: 'Query'
  status: {
    __typename?: 'Status'
    name: string
    environment: string
    state: State
    version: string
  }
}

export const ItemsQueryDocument = gql`
  query itemsQuery {
    items {
      id
      text
    }
  }
`
export const StatusQueryDocument = gql`
  query statusQuery {
    status {
      name
      environment
      state
      version
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
  _variables,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    itemsQuery(
      variables?: ItemsQueryQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<ItemsQueryQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ItemsQueryQuery>({
            document: ItemsQueryDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'itemsQuery',
        'query',
        variables,
      )
    },
    statusQuery(
      variables?: StatusQueryQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<StatusQueryQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<StatusQueryQuery>({
            document: StatusQueryDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'statusQuery',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
export function getSdkWithHooks(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  const sdk = getSdk(client, withWrapper)
  return {
    ...sdk,
    useItemsQuery(
      key: SWRKeyInterface,
      variables?: ItemsQueryQueryVariables,
      config?: SWRConfigInterface<ItemsQueryQuery, ClientError>,
    ) {
      return useSWR<ItemsQueryQuery, ClientError>(
        key,
        () => sdk.itemsQuery(variables),
        config,
      )
    },
    useStatusQuery(
      key: SWRKeyInterface,
      variables?: StatusQueryQueryVariables,
      config?: SWRConfigInterface<StatusQueryQuery, ClientError>,
    ) {
      return useSWR<StatusQueryQuery, ClientError>(
        key,
        () => sdk.statusQuery(variables),
        config,
      )
    },
  }
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>
