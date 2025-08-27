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
