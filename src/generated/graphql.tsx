import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ChessClass = {
  __typename?: 'ChessClass';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  white: UserClass;
  black: UserClass;
  firstPosition?: Maybe<PositionClass>;
};

export type ChessResponse = {
  __typename?: 'ChessResponse';
  errors?: Maybe<Array<FieldError>>;
  chess?: Maybe<ChessClass>;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  logout: Scalars['Boolean'];
  invitation: UserResponse;
};


export type MutationLoginArgs = {
  token: Scalars['String'];
};


export type MutationInvitationArgs = {
  email: Scalars['String'];
};

export type PositionClass = {
  __typename?: 'PositionClass';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  next?: Maybe<PositionClass>;
  position?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<UserClass>;
  users: Array<UserClass>;
  userByID?: Maybe<UserClass>;
  GameStatus: Scalars['Int'];
  createNewChess: ChessResponse;
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};

export type UserClass = {
  __typename?: 'UserClass';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  gameStatus?: Maybe<Scalars['Float']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<UserClass>;
};

export type ErrorFragmentFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type UserFragmentFragment = (
  { __typename?: 'UserClass' }
  & Pick<UserClass, '_id' | 'username' | 'email' | 'gameStatus'>
);

export type GameStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GameStatusQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'GameStatus'>
);

export type InvitationMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type InvitationMutation = (
  { __typename?: 'Mutation' }
  & { invitation: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragmentFragment
    )>>, user?: Maybe<(
      { __typename?: 'UserClass' }
      & UserFragmentFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserClass' }
    & Pick<UserClass, '_id' | 'username' | 'email'>
  )> }
);

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on FieldError {
  field
  message
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on UserClass {
  _id
  username
  email
  gameStatus
}
    `;
export const GameStatusDocument = gql`
    query GameStatus {
  GameStatus
}
    `;

export function useGameStatusQuery(options: Omit<Urql.UseQueryArgs<GameStatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GameStatusQuery>({ query: GameStatusDocument, ...options });
};
export const InvitationDocument = gql`
    mutation Invitation($email: String!) {
  invitation(email: $email) {
    errors {
      ...ErrorFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;

export function useInvitationMutation() {
  return Urql.useMutation<InvitationMutation, InvitationMutationVariables>(InvitationDocument);
};
export const LoginDocument = gql`
    mutation Login($token: String!) {
  login(token: $token) {
    errors {
      ...ErrorFragment
    }
    user {
      ...UserFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}
${UserFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    _id
    username
    email
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};