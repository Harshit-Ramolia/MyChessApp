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
  isGameRunning: Scalars['Boolean'];
  listOfPositions?: Maybe<Array<Scalars['String']>>;
  lastPosition?: Maybe<Scalars['String']>;
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

export type InvitationClass = {
  __typename?: 'InvitationClass';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  host: UserClass;
  friend: UserClass;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  logout: Scalars['Boolean'];
  invite: UserResponse;
  invalidateQuery: Scalars['Float'];
  saveMove: Scalars['Boolean'];
  endGame: Scalars['Boolean'];
  cancelInvitation: Scalars['Boolean'];
  acceptInvitation: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  token: Scalars['String'];
};


export type MutationInviteArgs = {
  email: Scalars['String'];
};


export type MutationSaveMoveArgs = {
  move: Scalars['String'];
  position: Scalars['String'];
  chessID: Scalars['String'];
};


export type MutationEndGameArgs = {
  chessID: Scalars['String'];
};


export type MutationAcceptInvitationArgs = {
  hostID: Scalars['String'];
};

export type PositionClass = {
  __typename?: 'PositionClass';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  chessID?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<UserClass>;
  users: Array<UserClass>;
  userByID?: Maybe<UserClass>;
  GameStatus: Scalars['Int'];
  currentGame?: Maybe<ChessClass>;
  createNewChess: ChessResponse;
  allChess: Array<ChessClass>;
  historyGames?: Maybe<Array<ChessClass>>;
  invitationsOfUser?: Maybe<Array<InvitationClass>>;
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  move?: Maybe<Scalars['String']>;
  gameStarted?: Maybe<Scalars['Boolean']>;
  newInvitation?: Maybe<InvitationClass>;
};


export type SubscriptionMoveArgs = {
  id: Scalars['String'];
};


export type SubscriptionGameStartedArgs = {
  id: Scalars['String'];
};


export type SubscriptionNewInvitationArgs = {
  id: Scalars['String'];
};

export type UserClass = {
  __typename?: 'UserClass';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  gameStatus: Scalars['Float'];
  currentGame?: Maybe<Scalars['String']>;
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

export type CancelInvitationMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelInvitationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cancelInvitation'>
);

export type AcceptInvitationMutationVariables = Exact<{
  hostID: Scalars['String'];
}>;


export type AcceptInvitationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptInvitation'>
);

export type EndGameMutationVariables = Exact<{
  chessID: Scalars['String'];
}>;


export type EndGameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'endGame'>
);

export type InvalidateQueryMutationVariables = Exact<{ [key: string]: never; }>;


export type InvalidateQueryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'invalidateQuery'>
);

export type InviteMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type InviteMutation = (
  { __typename?: 'Mutation' }
  & { invite: (
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

export type SaveMoveMutationVariables = Exact<{
  chessID: Scalars['String'];
  position: Scalars['String'];
  move: Scalars['String'];
}>;


export type SaveMoveMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'saveMove'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserClass' }
    & UserFragmentFragment
  )> }
);

export type CurrentGameQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentGameQuery = (
  { __typename?: 'Query' }
  & { currentGame?: Maybe<(
    { __typename?: 'ChessClass' }
    & Pick<ChessClass, '_id' | 'lastPosition'>
    & { white: (
      { __typename?: 'UserClass' }
      & UserFragmentFragment
    ), black: (
      { __typename?: 'UserClass' }
      & UserFragmentFragment
    ) }
  )> }
);

export type GameStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GameStatusQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'GameStatus'>
);

export type HistoryQueryVariables = Exact<{ [key: string]: never; }>;


export type HistoryQuery = (
  { __typename?: 'Query' }
  & { historyGames?: Maybe<Array<(
    { __typename?: 'ChessClass' }
    & Pick<ChessClass, '_id' | 'isGameRunning' | 'listOfPositions'>
    & { white: (
      { __typename?: 'UserClass' }
      & UserFragmentFragment
    ), black: (
      { __typename?: 'UserClass' }
      & UserFragmentFragment
    ) }
  )>> }
);

export type InvitationsQueryVariables = Exact<{ [key: string]: never; }>;


export type InvitationsQuery = (
  { __typename?: 'Query' }
  & { invitationsOfUser?: Maybe<Array<(
    { __typename?: 'InvitationClass' }
    & { host: (
      { __typename?: 'UserClass' }
      & UserFragmentFragment
    ), friend: (
      { __typename?: 'UserClass' }
      & UserFragmentFragment
    ) }
  )>> }
);

export type GameStartedSubscriptionVariables = Exact<{
  id: Scalars['String'];
}>;


export type GameStartedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'gameStarted'>
);

export type MoveSubscriptionVariables = Exact<{
  id: Scalars['String'];
}>;


export type MoveSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'move'>
);

export type NewInvitationSubscriptionVariables = Exact<{
  id: Scalars['String'];
}>;


export type NewInvitationSubscription = (
  { __typename?: 'Subscription' }
  & { newInvitation?: Maybe<(
    { __typename?: 'InvitationClass' }
    & { host: (
      { __typename?: 'UserClass' }
      & UserFragmentFragment
    ), friend: (
      { __typename?: 'UserClass' }
      & UserFragmentFragment
    ) }
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
export const CancelInvitationDocument = gql`
    mutation CancelInvitation {
  cancelInvitation
}
    `;

export function useCancelInvitationMutation() {
  return Urql.useMutation<CancelInvitationMutation, CancelInvitationMutationVariables>(CancelInvitationDocument);
};
export const AcceptInvitationDocument = gql`
    mutation AcceptInvitation($hostID: String!) {
  acceptInvitation(hostID: $hostID)
}
    `;

export function useAcceptInvitationMutation() {
  return Urql.useMutation<AcceptInvitationMutation, AcceptInvitationMutationVariables>(AcceptInvitationDocument);
};
export const EndGameDocument = gql`
    mutation EndGame($chessID: String!) {
  endGame(chessID: $chessID)
}
    `;

export function useEndGameMutation() {
  return Urql.useMutation<EndGameMutation, EndGameMutationVariables>(EndGameDocument);
};
export const InvalidateQueryDocument = gql`
    mutation InvalidateQuery {
  invalidateQuery
}
    `;

export function useInvalidateQueryMutation() {
  return Urql.useMutation<InvalidateQueryMutation, InvalidateQueryMutationVariables>(InvalidateQueryDocument);
};
export const InviteDocument = gql`
    mutation Invite($email: String!) {
  invite(email: $email) {
    errors {
      ...ErrorFragment
    }
  }
}
    ${ErrorFragmentFragmentDoc}`;

export function useInviteMutation() {
  return Urql.useMutation<InviteMutation, InviteMutationVariables>(InviteDocument);
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
export const SaveMoveDocument = gql`
    mutation SaveMove($chessID: String!, $position: String!, $move: String!) {
  saveMove(chessID: $chessID, position: $position, move: $move)
}
    `;

export function useSaveMoveMutation() {
  return Urql.useMutation<SaveMoveMutation, SaveMoveMutationVariables>(SaveMoveDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const CurrentGameDocument = gql`
    query CurrentGame {
  currentGame {
    _id
    lastPosition
    white {
      ...UserFragment
    }
    black {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

export function useCurrentGameQuery(options: Omit<Urql.UseQueryArgs<CurrentGameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentGameQuery>({ query: CurrentGameDocument, ...options });
};
export const GameStatusDocument = gql`
    query GameStatus {
  GameStatus
}
    `;

export function useGameStatusQuery(options: Omit<Urql.UseQueryArgs<GameStatusQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GameStatusQuery>({ query: GameStatusDocument, ...options });
};
export const HistoryDocument = gql`
    query History {
  historyGames {
    _id
    isGameRunning
    listOfPositions
    white {
      ...UserFragment
    }
    black {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

export function useHistoryQuery(options: Omit<Urql.UseQueryArgs<HistoryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HistoryQuery>({ query: HistoryDocument, ...options });
};
export const InvitationsDocument = gql`
    query Invitations {
  invitationsOfUser {
    host {
      ...UserFragment
    }
    friend {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

export function useInvitationsQuery(options: Omit<Urql.UseQueryArgs<InvitationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<InvitationsQuery>({ query: InvitationsDocument, ...options });
};
export const GameStartedDocument = gql`
    subscription GameStarted($id: String!) {
  gameStarted(id: $id)
}
    `;

export function useGameStartedSubscription<TData = GameStartedSubscription>(options: Omit<Urql.UseSubscriptionArgs<GameStartedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<GameStartedSubscription, TData>) {
  return Urql.useSubscription<GameStartedSubscription, TData, GameStartedSubscriptionVariables>({ query: GameStartedDocument, ...options }, handler);
};
export const MoveDocument = gql`
    subscription Move($id: String!) {
  move(id: $id)
}
    `;

export function useMoveSubscription<TData = MoveSubscription>(options: Omit<Urql.UseSubscriptionArgs<MoveSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<MoveSubscription, TData>) {
  return Urql.useSubscription<MoveSubscription, TData, MoveSubscriptionVariables>({ query: MoveDocument, ...options }, handler);
};
export const NewInvitationDocument = gql`
    subscription NewInvitation($id: String!) {
  newInvitation(id: $id) {
    host {
      ...UserFragment
    }
    friend {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

export function useNewInvitationSubscription<TData = NewInvitationSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewInvitationSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewInvitationSubscription, TData>) {
  return Urql.useSubscription<NewInvitationSubscription, TData, NewInvitationSubscriptionVariables>({ query: NewInvitationDocument, ...options }, handler);
};