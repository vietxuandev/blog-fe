import { getStrapiURL } from '@/lib/media';
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      ...{ headers: { 'Content-Type': 'application/json' } },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type About = {
  __typename?: 'About';
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AboutEntity = {
  __typename?: 'AboutEntity';
  attributes?: Maybe<About>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type AboutEntityResponse = {
  __typename?: 'AboutEntityResponse';
  data?: Maybe<AboutEntity>;
};

export type AboutInput = {
  content?: InputMaybe<Scalars['String']['input']>;
};

export type Article = {
  __typename?: 'Article';
  comments?: Maybe<CommentRelationResponseCollection>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  image: UploadFileEntityResponse;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  topic?: Maybe<TopicEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ArticleCommentsArgs = {
  filters?: InputMaybe<CommentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ArticleEntity = {
  __typename?: 'ArticleEntity';
  attributes?: Maybe<Article>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ArticleEntityResponse = {
  __typename?: 'ArticleEntityResponse';
  data?: Maybe<ArticleEntity>;
};

export type ArticleEntityResponseCollection = {
  __typename?: 'ArticleEntityResponseCollection';
  data: Array<ArticleEntity>;
  meta: ResponseCollectionMeta;
};

export type ArticleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>;
  comments?: InputMaybe<CommentFiltersInput>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ArticleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  topic?: InputMaybe<TopicFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ArticleInput = {
  comments?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  content?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  topic?: InputMaybe<Scalars['ID']['input']>;
};

export type ArticleRelationResponseCollection = {
  __typename?: 'ArticleRelationResponseCollection';
  data: Array<ArticleEntity>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  contains?: InputMaybe<Scalars['Boolean']['input']>;
  containsi?: InputMaybe<Scalars['Boolean']['input']>;
  endsWith?: InputMaybe<Scalars['Boolean']['input']>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  eqi?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']['input']>;
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Chap = {
  __typename?: 'Chap';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  image: UploadFileEntityResponse;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  topics?: Maybe<TopicRelationResponseCollection>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ChapTopicsArgs = {
  filters?: InputMaybe<TopicFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ChapEntity = {
  __typename?: 'ChapEntity';
  attributes?: Maybe<Chap>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type ChapEntityResponse = {
  __typename?: 'ChapEntityResponse';
  data?: Maybe<ChapEntity>;
};

export type ChapEntityResponseCollection = {
  __typename?: 'ChapEntityResponseCollection';
  data: Array<ChapEntity>;
  meta: ResponseCollectionMeta;
};

export type ChapFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ChapFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ChapFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ChapFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  topics?: InputMaybe<TopicFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ChapInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type Comment = {
  __typename?: 'Comment';
  article?: Maybe<ArticleEntityResponse>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CommentEntity = {
  __typename?: 'CommentEntity';
  attributes?: Maybe<Comment>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type CommentEntityResponse = {
  __typename?: 'CommentEntityResponse';
  data?: Maybe<CommentEntity>;
};

export type CommentEntityResponseCollection = {
  __typename?: 'CommentEntityResponseCollection';
  data: Array<CommentEntity>;
  meta: ResponseCollectionMeta;
};

export type CommentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CommentFiltersInput>>>;
  article?: InputMaybe<ArticleFiltersInput>;
  content?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CommentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CommentFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CommentInput = {
  article?: InputMaybe<Scalars['ID']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CommentRelationResponseCollection = {
  __typename?: 'CommentRelationResponseCollection';
  data: Array<CommentEntity>;
};

export type ComponentDecorationHero = {
  __typename?: 'ComponentDecorationHero';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type ComponentDecorationHeroInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ComponentSharedSeo = {
  __typename?: 'ComponentSharedSeo';
  id: Scalars['ID']['output'];
  metaDescription: Scalars['String']['output'];
  metaTitle: Scalars['String']['output'];
  shareImage?: Maybe<UploadFileEntityResponse>;
};

export type ComponentSharedSeoInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  shareImage?: InputMaybe<Scalars['ID']['input']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  contains?: InputMaybe<Scalars['DateTime']['input']>;
  containsi?: InputMaybe<Scalars['DateTime']['input']>;
  endsWith?: InputMaybe<Scalars['DateTime']['input']>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  eqi?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']['input']>;
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  contains?: InputMaybe<Scalars['Float']['input']>;
  containsi?: InputMaybe<Scalars['Float']['input']>;
  endsWith?: InputMaybe<Scalars['Float']['input']>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  eqi?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']['input']>;
  notContainsi?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  startsWith?: InputMaybe<Scalars['Float']['input']>;
};

export type GenericMorph =
  | About
  | Article
  | Chap
  | Comment
  | ComponentDecorationHero
  | ComponentSharedSeo
  | Global
  | Homepage
  | I18NLocale
  | Topic
  | UploadFile
  | UploadFolder
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser;

export type Global = {
  __typename?: 'Global';
  banner: UploadFileEntityResponse;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  defaultSeo: ComponentSharedSeo;
  favicon: UploadFileEntityResponse;
  siteName: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GlobalEntity = {
  __typename?: 'GlobalEntity';
  attributes?: Maybe<Global>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type GlobalEntityResponse = {
  __typename?: 'GlobalEntityResponse';
  data?: Maybe<GlobalEntity>;
};

export type GlobalInput = {
  banner?: InputMaybe<Scalars['ID']['input']>;
  defaultSeo?: InputMaybe<ComponentSharedSeoInput>;
  favicon?: InputMaybe<Scalars['ID']['input']>;
  siteName?: InputMaybe<Scalars['String']['input']>;
};

export type Homepage = {
  __typename?: 'Homepage';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  hero: ComponentDecorationHero;
  seo?: Maybe<ComponentSharedSeo>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type HomepageEntity = {
  __typename?: 'HomepageEntity';
  attributes?: Maybe<Homepage>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type HomepageEntityResponse = {
  __typename?: 'HomepageEntityResponse';
  data?: Maybe<HomepageEntity>;
};

export type HomepageInput = {
  hero?: InputMaybe<ComponentDecorationHeroInput>;
  seo?: InputMaybe<ComponentSharedSeoInput>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  contains?: InputMaybe<Scalars['ID']['input']>;
  containsi?: InputMaybe<Scalars['ID']['input']>;
  endsWith?: InputMaybe<Scalars['ID']['input']>;
  eq?: InputMaybe<Scalars['ID']['input']>;
  eqi?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  ne?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']['input']>;
  notContainsi?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  startsWith?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  contains?: InputMaybe<Scalars['Int']['input']>;
  containsi?: InputMaybe<Scalars['Int']['input']>;
  endsWith?: InputMaybe<Scalars['Int']['input']>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  eqi?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']['input']>;
  notContainsi?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startsWith?: InputMaybe<Scalars['Int']['input']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  contains?: InputMaybe<Scalars['JSON']['input']>;
  containsi?: InputMaybe<Scalars['JSON']['input']>;
  endsWith?: InputMaybe<Scalars['JSON']['input']>;
  eq?: InputMaybe<Scalars['JSON']['input']>;
  eqi?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  ne?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']['input']>;
  notContainsi?: InputMaybe<Scalars['JSON']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
  startsWith?: InputMaybe<Scalars['JSON']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createArticle?: Maybe<ArticleEntityResponse>;
  createChap?: Maybe<ChapEntityResponse>;
  createComment?: Maybe<CommentEntityResponse>;
  createTopic?: Maybe<TopicEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteAbout?: Maybe<AboutEntityResponse>;
  deleteArticle?: Maybe<ArticleEntityResponse>;
  deleteChap?: Maybe<ChapEntityResponse>;
  deleteComment?: Maybe<CommentEntityResponse>;
  deleteGlobal?: Maybe<GlobalEntityResponse>;
  deleteHomepage?: Maybe<HomepageEntityResponse>;
  deleteTopic?: Maybe<TopicEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAbout?: Maybe<AboutEntityResponse>;
  updateArticle?: Maybe<ArticleEntityResponse>;
  updateChap?: Maybe<ChapEntityResponse>;
  updateComment?: Maybe<CommentEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateGlobal?: Maybe<GlobalEntityResponse>;
  updateHomepage?: Maybe<HomepageEntityResponse>;
  updateTopic?: Maybe<TopicEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};

export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};

export type MutationCreateArticleArgs = {
  data: ArticleInput;
};

export type MutationCreateChapArgs = {
  data: ChapInput;
};

export type MutationCreateCommentArgs = {
  data: CommentInput;
};

export type MutationCreateTopicArgs = {
  data: TopicInput;
};

export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};

export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};

export type MutationDeleteArticleArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteChapArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteTopicArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input'];
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  files: Array<InputMaybe<Scalars['Upload']['input']>>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input'];
};

export type MutationResetPasswordArgs = {
  code: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};

export type MutationUpdateAboutArgs = {
  data: AboutInput;
};

export type MutationUpdateArticleArgs = {
  data: ArticleInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateChapArgs = {
  data: ChapInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateCommentArgs = {
  data: CommentInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateGlobalArgs = {
  data: GlobalInput;
};

export type MutationUpdateHomepageArgs = {
  data: HomepageInput;
};

export type MutationUpdateTopicArgs = {
  data: TopicInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID']['input'];
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']['input']>;
  refId?: InputMaybe<Scalars['ID']['input']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW',
}

export type Query = {
  __typename?: 'Query';
  about?: Maybe<AboutEntityResponse>;
  article?: Maybe<ArticleEntityResponse>;
  articles?: Maybe<ArticleEntityResponseCollection>;
  chap?: Maybe<ChapEntityResponse>;
  chaps?: Maybe<ChapEntityResponseCollection>;
  comment?: Maybe<CommentEntityResponse>;
  comments?: Maybe<CommentEntityResponseCollection>;
  global?: Maybe<GlobalEntityResponse>;
  homepage?: Maybe<HomepageEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  topic?: Maybe<TopicEntityResponse>;
  topics?: Maybe<TopicEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};

export type QueryArticleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryChapArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryChapsArgs = {
  filters?: InputMaybe<ChapFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryCommentArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryCommentsArgs = {
  filters?: InputMaybe<CommentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryTopicArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryTopicsArgs = {
  filters?: InputMaybe<TopicFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  containsi?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  eqi?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notContainsi?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  notNull?: InputMaybe<Scalars['Boolean']['input']>;
  null?: InputMaybe<Scalars['Boolean']['input']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Topic = {
  __typename?: 'Topic';
  articles?: Maybe<ArticleRelationResponseCollection>;
  chap?: Maybe<ChapEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  image: UploadFileEntityResponse;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TopicArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type TopicEntity = {
  __typename?: 'TopicEntity';
  attributes?: Maybe<Topic>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type TopicEntityResponse = {
  __typename?: 'TopicEntityResponse';
  data?: Maybe<TopicEntity>;
};

export type TopicEntityResponseCollection = {
  __typename?: 'TopicEntityResponseCollection';
  data: Array<TopicEntity>;
  meta: ResponseCollectionMeta;
};

export type TopicFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TopicFiltersInput>>>;
  articles?: InputMaybe<ArticleFiltersInput>;
  chap?: InputMaybe<ChapFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<TopicFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TopicFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TopicInput = {
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  chap?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['ID']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type TopicRelationResponseCollection = {
  __typename?: 'TopicRelationResponseCollection';
  data: Array<TopicEntity>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  ext?: Maybe<Scalars['String']['output']>;
  formats?: Maybe<Scalars['JSON']['output']>;
  hash: Scalars['String']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  mime: Scalars['String']['output'];
  name: Scalars['String']['output'];
  previewUrl?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  provider_metadata?: Maybe<Scalars['JSON']['output']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  ext?: InputMaybe<Scalars['String']['input']>;
  folder?: InputMaybe<Scalars['ID']['input']>;
  folderPath?: InputMaybe<Scalars['String']['input']>;
  formats?: InputMaybe<Scalars['JSON']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  mime?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  previewUrl?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  provider_metadata?: InputMaybe<Scalars['JSON']['input']>;
  size?: InputMaybe<Scalars['Float']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String']['output'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String']['output'];
  pathId: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['ID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  pathId?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input'];
  password: Scalars['String']['input'];
  provider?: Scalars['String']['input'];
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']['output']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean']['output'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']['output']>;
  confirmed?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  provider?: Maybe<Scalars['String']['output']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']['output']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  confirmationToken?: InputMaybe<Scalars['String']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type AboutFragment = {
  __typename?: 'AboutEntity';
  attributes?: { __typename?: 'About'; content: string } | null;
};

export type AboutQueryVariables = Exact<{ [key: string]: never }>;

export type AboutQuery = {
  __typename?: 'Query';
  about?: {
    __typename?: 'AboutEntityResponse';
    data?: {
      __typename?: 'AboutEntity';
      attributes?: { __typename?: 'About'; content: string } | null;
    } | null;
  } | null;
};

export type ArticleFragment = {
  __typename?: 'ArticleEntity';
  id?: string | null;
  attributes?: {
    __typename?: 'Article';
    slug: string;
    content: string;
    description: string;
    title: string;
    publishedAt?: any | null;
    image: {
      __typename?: 'UploadFileEntityResponse';
      data?: {
        __typename?: 'UploadFileEntity';
        id?: string | null;
        attributes?: {
          __typename?: 'UploadFile';
          url: string;
          width?: number | null;
          height?: number | null;
          alternativeText?: string | null;
          name: string;
        } | null;
      } | null;
    };
  } | null;
};

export type ArticlesQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationArg>;
  filters?: InputMaybe<ArticleFiltersInput>;
  sort?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type ArticlesQuery = {
  __typename?: 'Query';
  articles?: {
    __typename?: 'ArticleEntityResponseCollection';
    data: Array<{
      __typename?: 'ArticleEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'Article';
        slug: string;
        content: string;
        description: string;
        title: string;
        publishedAt?: any | null;
        image: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            id?: string | null;
            attributes?: {
              __typename?: 'UploadFile';
              url: string;
              width?: number | null;
              height?: number | null;
              alternativeText?: string | null;
              name: string;
            } | null;
          } | null;
        };
      } | null;
    }>;
    meta: {
      __typename?: 'ResponseCollectionMeta';
      pagination: {
        __typename?: 'Pagination';
        page: number;
        total: number;
        pageSize: number;
        pageCount: number;
      };
    };
  } | null;
};

export type ChapFragment = {
  __typename?: 'ChapEntity';
  id?: string | null;
  attributes?: {
    __typename?: 'Chap';
    slug: string;
    description: string;
    title: string;
    publishedAt?: any | null;
    image: {
      __typename?: 'UploadFileEntityResponse';
      data?: {
        __typename?: 'UploadFileEntity';
        id?: string | null;
        attributes?: {
          __typename?: 'UploadFile';
          url: string;
          width?: number | null;
          height?: number | null;
          alternativeText?: string | null;
          name: string;
        } | null;
      } | null;
    };
  } | null;
};

export type ChapsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationArg>;
  filters?: InputMaybe<ChapFiltersInput>;
  sort?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type ChapsQuery = {
  __typename?: 'Query';
  chaps?: {
    __typename?: 'ChapEntityResponseCollection';
    data: Array<{
      __typename?: 'ChapEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'Chap';
        slug: string;
        description: string;
        title: string;
        publishedAt?: any | null;
        image: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            id?: string | null;
            attributes?: {
              __typename?: 'UploadFile';
              url: string;
              width?: number | null;
              height?: number | null;
              alternativeText?: string | null;
              name: string;
            } | null;
          } | null;
        };
      } | null;
    }>;
    meta: {
      __typename?: 'ResponseCollectionMeta';
      pagination: {
        __typename?: 'Pagination';
        page: number;
        total: number;
        pageSize: number;
        pageCount: number;
      };
    };
  } | null;
};

export type CommentFragment = {
  __typename?: 'CommentEntity';
  id?: string | null;
  attributes?: {
    __typename?: 'Comment';
    name: string;
    content: string;
    createdAt?: any | null;
  } | null;
};

export type CreateCommentMutationVariables = Exact<{
  data: CommentInput;
}>;

export type CreateCommentMutation = {
  __typename?: 'Mutation';
  createComment?: {
    __typename?: 'CommentEntityResponse';
    data?: {
      __typename?: 'CommentEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'Comment';
        name: string;
        content: string;
        createdAt?: any | null;
      } | null;
    } | null;
  } | null;
};

export type CommentsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationArg>;
  filters?: InputMaybe<CommentFiltersInput>;
  sort?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type CommentsQuery = {
  __typename?: 'Query';
  comments?: {
    __typename?: 'CommentEntityResponseCollection';
    data: Array<{
      __typename?: 'CommentEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'Comment';
        name: string;
        content: string;
        createdAt?: any | null;
      } | null;
    }>;
    meta: {
      __typename?: 'ResponseCollectionMeta';
      pagination: {
        __typename?: 'Pagination';
        page: number;
        total: number;
        pageSize: number;
        pageCount: number;
      };
    };
  } | null;
};

export type FileFragment = {
  __typename?: 'UploadFileEntity';
  id?: string | null;
  attributes?: {
    __typename?: 'UploadFile';
    url: string;
    width?: number | null;
    height?: number | null;
    alternativeText?: string | null;
    name: string;
  } | null;
};

export type GlobalFragment = {
  __typename?: 'GlobalEntity';
  attributes?: {
    __typename?: 'Global';
    siteName: string;
    favicon: {
      __typename?: 'UploadFileEntityResponse';
      data?: {
        __typename?: 'UploadFileEntity';
        id?: string | null;
        attributes?: {
          __typename?: 'UploadFile';
          url: string;
          width?: number | null;
          height?: number | null;
          alternativeText?: string | null;
          name: string;
        } | null;
      } | null;
    };
    defaultSeo: {
      __typename?: 'ComponentSharedSeo';
      metaTitle: string;
      metaDescription: string;
      shareImage?: {
        __typename?: 'UploadFileEntityResponse';
        data?: {
          __typename?: 'UploadFileEntity';
          id?: string | null;
          attributes?: {
            __typename?: 'UploadFile';
            url: string;
            width?: number | null;
            height?: number | null;
            alternativeText?: string | null;
            name: string;
          } | null;
        } | null;
      } | null;
    };
    banner: {
      __typename?: 'UploadFileEntityResponse';
      data?: {
        __typename?: 'UploadFileEntity';
        id?: string | null;
        attributes?: {
          __typename?: 'UploadFile';
          url: string;
          width?: number | null;
          height?: number | null;
          alternativeText?: string | null;
          name: string;
        } | null;
      } | null;
    };
  } | null;
};

export type GlobalQueryVariables = Exact<{ [key: string]: never }>;

export type GlobalQuery = {
  __typename?: 'Query';
  global?: {
    __typename?: 'GlobalEntityResponse';
    data?: {
      __typename?: 'GlobalEntity';
      attributes?: {
        __typename?: 'Global';
        siteName: string;
        favicon: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            id?: string | null;
            attributes?: {
              __typename?: 'UploadFile';
              url: string;
              width?: number | null;
              height?: number | null;
              alternativeText?: string | null;
              name: string;
            } | null;
          } | null;
        };
        defaultSeo: {
          __typename?: 'ComponentSharedSeo';
          metaTitle: string;
          metaDescription: string;
          shareImage?: {
            __typename?: 'UploadFileEntityResponse';
            data?: {
              __typename?: 'UploadFileEntity';
              id?: string | null;
              attributes?: {
                __typename?: 'UploadFile';
                url: string;
                width?: number | null;
                height?: number | null;
                alternativeText?: string | null;
                name: string;
              } | null;
            } | null;
          } | null;
        };
        banner: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            id?: string | null;
            attributes?: {
              __typename?: 'UploadFile';
              url: string;
              width?: number | null;
              height?: number | null;
              alternativeText?: string | null;
              name: string;
            } | null;
          } | null;
        };
      } | null;
    } | null;
  } | null;
};

export type HomepageFragment = {
  __typename?: 'HomepageEntity';
  attributes?: {
    __typename?: 'Homepage';
    hero: { __typename?: 'ComponentDecorationHero'; title: string };
    seo?: {
      __typename?: 'ComponentSharedSeo';
      metaTitle: string;
      metaDescription: string;
      shareImage?: {
        __typename?: 'UploadFileEntityResponse';
        data?: {
          __typename?: 'UploadFileEntity';
          id?: string | null;
          attributes?: {
            __typename?: 'UploadFile';
            url: string;
            width?: number | null;
            height?: number | null;
            alternativeText?: string | null;
            name: string;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type HomepageQueryVariables = Exact<{ [key: string]: never }>;

export type HomepageQuery = {
  __typename?: 'Query';
  homepage?: {
    __typename?: 'HomepageEntityResponse';
    data?: {
      __typename?: 'HomepageEntity';
      attributes?: {
        __typename?: 'Homepage';
        hero: { __typename?: 'ComponentDecorationHero'; title: string };
        seo?: {
          __typename?: 'ComponentSharedSeo';
          metaTitle: string;
          metaDescription: string;
          shareImage?: {
            __typename?: 'UploadFileEntityResponse';
            data?: {
              __typename?: 'UploadFileEntity';
              id?: string | null;
              attributes?: {
                __typename?: 'UploadFile';
                url: string;
                width?: number | null;
                height?: number | null;
                alternativeText?: string | null;
                name: string;
              } | null;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type MenuQueryVariables = Exact<{ [key: string]: never }>;

export type MenuQuery = {
  __typename?: 'Query';
  chaps?: {
    __typename?: 'ChapEntityResponseCollection';
    data: Array<{
      __typename?: 'ChapEntity';
      attributes?: {
        __typename?: 'Chap';
        title: string;
        slug: string;
        topics?: {
          __typename?: 'TopicRelationResponseCollection';
          data: Array<{
            __typename?: 'TopicEntity';
            attributes?: {
              __typename?: 'Topic';
              title: string;
              slug: string;
              articles?: {
                __typename?: 'ArticleRelationResponseCollection';
                data: Array<{
                  __typename?: 'ArticleEntity';
                  attributes?: {
                    __typename?: 'Article';
                    title: string;
                    slug: string;
                  } | null;
                }>;
              } | null;
            } | null;
          }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type MetaFragment = {
  __typename?: 'ResponseCollectionMeta';
  pagination: {
    __typename?: 'Pagination';
    page: number;
    total: number;
    pageSize: number;
    pageCount: number;
  };
};

export type SeoFragment = {
  __typename?: 'ComponentSharedSeo';
  metaTitle: string;
  metaDescription: string;
  shareImage?: {
    __typename?: 'UploadFileEntityResponse';
    data?: {
      __typename?: 'UploadFileEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'UploadFile';
        url: string;
        width?: number | null;
        height?: number | null;
        alternativeText?: string | null;
        name: string;
      } | null;
    } | null;
  } | null;
};

export type TopicFragment = {
  __typename?: 'TopicEntity';
  id?: string | null;
  attributes?: {
    __typename?: 'Topic';
    slug: string;
    description: string;
    title: string;
    publishedAt?: any | null;
    image: {
      __typename?: 'UploadFileEntityResponse';
      data?: {
        __typename?: 'UploadFileEntity';
        id?: string | null;
        attributes?: {
          __typename?: 'UploadFile';
          url: string;
          width?: number | null;
          height?: number | null;
          alternativeText?: string | null;
          name: string;
        } | null;
      } | null;
    };
  } | null;
};

export type TopicsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationArg>;
  filters?: InputMaybe<TopicFiltersInput>;
  sort?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type TopicsQuery = {
  __typename?: 'Query';
  topics?: {
    __typename?: 'TopicEntityResponseCollection';
    data: Array<{
      __typename?: 'TopicEntity';
      id?: string | null;
      attributes?: {
        __typename?: 'Topic';
        slug: string;
        description: string;
        title: string;
        publishedAt?: any | null;
        image: {
          __typename?: 'UploadFileEntityResponse';
          data?: {
            __typename?: 'UploadFileEntity';
            id?: string | null;
            attributes?: {
              __typename?: 'UploadFile';
              url: string;
              width?: number | null;
              height?: number | null;
              alternativeText?: string | null;
              name: string;
            } | null;
          } | null;
        };
      } | null;
    }>;
    meta: {
      __typename?: 'ResponseCollectionMeta';
      pagination: {
        __typename?: 'Pagination';
        page: number;
        total: number;
        pageSize: number;
        pageCount: number;
      };
    };
  } | null;
};

export const AboutFragmentDoc = `
    fragment About on AboutEntity {
  attributes {
    content
  }
}
    `;
export const FileFragmentDoc = `
    fragment File on UploadFileEntity {
  id
  attributes {
    url
    width
    height
    alternativeText
    name
  }
}
    `;
export const ArticleFragmentDoc = `
    fragment Article on ArticleEntity {
  id
  attributes {
    slug
    content
    description
    title
    image {
      data {
        ...File
      }
    }
    publishedAt
  }
}
    `;
export const ChapFragmentDoc = `
    fragment Chap on ChapEntity {
  id
  attributes {
    slug
    description
    title
    image {
      data {
        ...File
      }
    }
    publishedAt
  }
}
    `;
export const CommentFragmentDoc = `
    fragment Comment on CommentEntity {
  id
  attributes {
    name
    content
    createdAt
  }
}
    `;
export const SeoFragmentDoc = `
    fragment Seo on ComponentSharedSeo {
  metaTitle
  metaDescription
  shareImage {
    data {
      ...File
    }
  }
}
    `;
export const GlobalFragmentDoc = `
    fragment Global on GlobalEntity {
  attributes {
    siteName
    favicon {
      data {
        ...File
      }
    }
    defaultSeo {
      ...Seo
    }
    banner {
      data {
        ...File
      }
    }
  }
}
    `;
export const HomepageFragmentDoc = `
    fragment Homepage on HomepageEntity {
  attributes {
    hero {
      title
    }
    seo {
      ...Seo
    }
  }
}
    `;
export const MetaFragmentDoc = `
    fragment Meta on ResponseCollectionMeta {
  pagination {
    page
    total
    pageSize
    pageCount
  }
}
    `;
export const TopicFragmentDoc = `
    fragment Topic on TopicEntity {
  id
  attributes {
    slug
    description
    title
    image {
      data {
        ...File
      }
    }
    publishedAt
  }
}
    `;
export const AboutDocument = `
    query About {
  about {
    data {
      ...About
    }
  }
}
    ${AboutFragmentDoc}`;
export const useAboutQuery = <TData = AboutQuery, TError = unknown>(
  variables?: AboutQueryVariables,
  options?: UseQueryOptions<AboutQuery, TError, TData>
) =>
  useQuery<AboutQuery, TError, TData>(
    variables === undefined ? ['About'] : ['About', variables],
    fetcher<AboutQuery, AboutQueryVariables>(AboutDocument, variables),
    options
  );

useAboutQuery.getKey = (variables?: AboutQueryVariables) =>
  variables === undefined ? ['About'] : ['About', variables];
export const useInfiniteAboutQuery = <TData = AboutQuery, TError = unknown>(
  pageParamKey: keyof AboutQueryVariables,
  variables?: AboutQueryVariables,
  options?: UseInfiniteQueryOptions<AboutQuery, TError, TData>
) =>
  useInfiniteQuery<AboutQuery, TError, TData>(
    variables === undefined
      ? ['About.infinite']
      : ['About.infinite', variables],
    (metaData) =>
      fetcher<AboutQuery, AboutQueryVariables>(AboutDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options
  );

useInfiniteAboutQuery.getKey = (variables?: AboutQueryVariables) =>
  variables === undefined ? ['About.infinite'] : ['About.infinite', variables];
useAboutQuery.fetcher = (variables?: AboutQueryVariables) =>
  fetcher<AboutQuery, AboutQueryVariables>(AboutDocument, variables);
export const ArticlesDocument = `
    query Articles($pagination: PaginationArg, $filters: ArticleFiltersInput, $sort: [String]) {
  articles(pagination: $pagination, filters: $filters, sort: $sort) {
    data {
      ...Article
    }
    meta {
      ...Meta
    }
  }
}
    ${ArticleFragmentDoc}
${FileFragmentDoc}
${MetaFragmentDoc}`;
export const useArticlesQuery = <TData = ArticlesQuery, TError = unknown>(
  variables?: ArticlesQueryVariables,
  options?: UseQueryOptions<ArticlesQuery, TError, TData>
) =>
  useQuery<ArticlesQuery, TError, TData>(
    variables === undefined ? ['Articles'] : ['Articles', variables],
    fetcher<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, variables),
    options
  );

useArticlesQuery.getKey = (variables?: ArticlesQueryVariables) =>
  variables === undefined ? ['Articles'] : ['Articles', variables];
export const useInfiniteArticlesQuery = <
  TData = ArticlesQuery,
  TError = unknown
>(
  pageParamKey: keyof ArticlesQueryVariables,
  variables?: ArticlesQueryVariables,
  options?: UseInfiniteQueryOptions<ArticlesQuery, TError, TData>
) =>
  useInfiniteQuery<ArticlesQuery, TError, TData>(
    variables === undefined
      ? ['Articles.infinite']
      : ['Articles.infinite', variables],
    (metaData) =>
      fetcher<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options
  );

useInfiniteArticlesQuery.getKey = (variables?: ArticlesQueryVariables) =>
  variables === undefined
    ? ['Articles.infinite']
    : ['Articles.infinite', variables];
useArticlesQuery.fetcher = (variables?: ArticlesQueryVariables) =>
  fetcher<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, variables);
export const ChapsDocument = `
    query Chaps($pagination: PaginationArg, $filters: ChapFiltersInput, $sort: [String]) {
  chaps(pagination: $pagination, filters: $filters, sort: $sort) {
    data {
      ...Chap
    }
    meta {
      ...Meta
    }
  }
}
    ${ChapFragmentDoc}
${FileFragmentDoc}
${MetaFragmentDoc}`;
export const useChapsQuery = <TData = ChapsQuery, TError = unknown>(
  variables?: ChapsQueryVariables,
  options?: UseQueryOptions<ChapsQuery, TError, TData>
) =>
  useQuery<ChapsQuery, TError, TData>(
    variables === undefined ? ['Chaps'] : ['Chaps', variables],
    fetcher<ChapsQuery, ChapsQueryVariables>(ChapsDocument, variables),
    options
  );

useChapsQuery.getKey = (variables?: ChapsQueryVariables) =>
  variables === undefined ? ['Chaps'] : ['Chaps', variables];
export const useInfiniteChapsQuery = <TData = ChapsQuery, TError = unknown>(
  pageParamKey: keyof ChapsQueryVariables,
  variables?: ChapsQueryVariables,
  options?: UseInfiniteQueryOptions<ChapsQuery, TError, TData>
) =>
  useInfiniteQuery<ChapsQuery, TError, TData>(
    variables === undefined
      ? ['Chaps.infinite']
      : ['Chaps.infinite', variables],
    (metaData) =>
      fetcher<ChapsQuery, ChapsQueryVariables>(ChapsDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options
  );

useInfiniteChapsQuery.getKey = (variables?: ChapsQueryVariables) =>
  variables === undefined ? ['Chaps.infinite'] : ['Chaps.infinite', variables];
useChapsQuery.fetcher = (variables?: ChapsQueryVariables) =>
  fetcher<ChapsQuery, ChapsQueryVariables>(ChapsDocument, variables);
export const CreateCommentDocument = `
    mutation CreateComment($data: CommentInput!) {
  createComment(data: $data) {
    data {
      ...Comment
    }
  }
}
    ${CommentFragmentDoc}`;
export const useCreateCommentMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateCommentMutation,
    TError,
    CreateCommentMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreateCommentMutation,
    TError,
    CreateCommentMutationVariables,
    TContext
  >(
    ['CreateComment'],
    (variables?: CreateCommentMutationVariables) =>
      fetcher<CreateCommentMutation, CreateCommentMutationVariables>(
        CreateCommentDocument,
        variables
      )(),
    options
  );
useCreateCommentMutation.fetcher = (
  variables: CreateCommentMutationVariables
) =>
  fetcher<CreateCommentMutation, CreateCommentMutationVariables>(
    CreateCommentDocument,
    variables
  );
export const CommentsDocument = `
    query Comments($pagination: PaginationArg, $filters: CommentFiltersInput, $sort: [String]) {
  comments(pagination: $pagination, filters: $filters, sort: $sort) {
    data {
      ...Comment
    }
    meta {
      ...Meta
    }
  }
}
    ${CommentFragmentDoc}
${MetaFragmentDoc}`;
export const useCommentsQuery = <TData = CommentsQuery, TError = unknown>(
  variables?: CommentsQueryVariables,
  options?: UseQueryOptions<CommentsQuery, TError, TData>
) =>
  useQuery<CommentsQuery, TError, TData>(
    variables === undefined ? ['Comments'] : ['Comments', variables],
    fetcher<CommentsQuery, CommentsQueryVariables>(CommentsDocument, variables),
    options
  );

useCommentsQuery.getKey = (variables?: CommentsQueryVariables) =>
  variables === undefined ? ['Comments'] : ['Comments', variables];
export const useInfiniteCommentsQuery = <
  TData = CommentsQuery,
  TError = unknown
>(
  pageParamKey: keyof CommentsQueryVariables,
  variables?: CommentsQueryVariables,
  options?: UseInfiniteQueryOptions<CommentsQuery, TError, TData>
) =>
  useInfiniteQuery<CommentsQuery, TError, TData>(
    variables === undefined
      ? ['Comments.infinite']
      : ['Comments.infinite', variables],
    (metaData) =>
      fetcher<CommentsQuery, CommentsQueryVariables>(CommentsDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options
  );

useInfiniteCommentsQuery.getKey = (variables?: CommentsQueryVariables) =>
  variables === undefined
    ? ['Comments.infinite']
    : ['Comments.infinite', variables];
useCommentsQuery.fetcher = (variables?: CommentsQueryVariables) =>
  fetcher<CommentsQuery, CommentsQueryVariables>(CommentsDocument, variables);
export const GlobalDocument = `
    query Global {
  global {
    data {
      ...Global
    }
  }
}
    ${GlobalFragmentDoc}
${FileFragmentDoc}
${SeoFragmentDoc}`;
export const useGlobalQuery = <TData = GlobalQuery, TError = unknown>(
  variables?: GlobalQueryVariables,
  options?: UseQueryOptions<GlobalQuery, TError, TData>
) =>
  useQuery<GlobalQuery, TError, TData>(
    variables === undefined ? ['Global'] : ['Global', variables],
    fetcher<GlobalQuery, GlobalQueryVariables>(GlobalDocument, variables),
    options
  );

useGlobalQuery.getKey = (variables?: GlobalQueryVariables) =>
  variables === undefined ? ['Global'] : ['Global', variables];
export const useInfiniteGlobalQuery = <TData = GlobalQuery, TError = unknown>(
  pageParamKey: keyof GlobalQueryVariables,
  variables?: GlobalQueryVariables,
  options?: UseInfiniteQueryOptions<GlobalQuery, TError, TData>
) =>
  useInfiniteQuery<GlobalQuery, TError, TData>(
    variables === undefined
      ? ['Global.infinite']
      : ['Global.infinite', variables],
    (metaData) =>
      fetcher<GlobalQuery, GlobalQueryVariables>(GlobalDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options
  );

useInfiniteGlobalQuery.getKey = (variables?: GlobalQueryVariables) =>
  variables === undefined
    ? ['Global.infinite']
    : ['Global.infinite', variables];
useGlobalQuery.fetcher = (variables?: GlobalQueryVariables) =>
  fetcher<GlobalQuery, GlobalQueryVariables>(GlobalDocument, variables);
export const HomepageDocument = `
    query Homepage {
  homepage {
    data {
      ...Homepage
    }
  }
}
    ${HomepageFragmentDoc}
${SeoFragmentDoc}
${FileFragmentDoc}`;
export const useHomepageQuery = <TData = HomepageQuery, TError = unknown>(
  variables?: HomepageQueryVariables,
  options?: UseQueryOptions<HomepageQuery, TError, TData>
) =>
  useQuery<HomepageQuery, TError, TData>(
    variables === undefined ? ['Homepage'] : ['Homepage', variables],
    fetcher<HomepageQuery, HomepageQueryVariables>(HomepageDocument, variables),
    options
  );

useHomepageQuery.getKey = (variables?: HomepageQueryVariables) =>
  variables === undefined ? ['Homepage'] : ['Homepage', variables];
export const useInfiniteHomepageQuery = <
  TData = HomepageQuery,
  TError = unknown
>(
  pageParamKey: keyof HomepageQueryVariables,
  variables?: HomepageQueryVariables,
  options?: UseInfiniteQueryOptions<HomepageQuery, TError, TData>
) =>
  useInfiniteQuery<HomepageQuery, TError, TData>(
    variables === undefined
      ? ['Homepage.infinite']
      : ['Homepage.infinite', variables],
    (metaData) =>
      fetcher<HomepageQuery, HomepageQueryVariables>(HomepageDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options
  );

useInfiniteHomepageQuery.getKey = (variables?: HomepageQueryVariables) =>
  variables === undefined
    ? ['Homepage.infinite']
    : ['Homepage.infinite', variables];
useHomepageQuery.fetcher = (variables?: HomepageQueryVariables) =>
  fetcher<HomepageQuery, HomepageQueryVariables>(HomepageDocument, variables);
export const MenuDocument = `
    query Menu {
  chaps {
    data {
      attributes {
        title
        slug
        topics {
          data {
            attributes {
              title
              slug
              articles {
                data {
                  attributes {
                    title
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const useMenuQuery = <TData = MenuQuery, TError = unknown>(
  variables?: MenuQueryVariables,
  options?: UseQueryOptions<MenuQuery, TError, TData>
) =>
  useQuery<MenuQuery, TError, TData>(
    variables === undefined ? ['Menu'] : ['Menu', variables],
    fetcher<MenuQuery, MenuQueryVariables>(MenuDocument, variables),
    options
  );

useMenuQuery.getKey = (variables?: MenuQueryVariables) =>
  variables === undefined ? ['Menu'] : ['Menu', variables];
export const useInfiniteMenuQuery = <TData = MenuQuery, TError = unknown>(
  pageParamKey: keyof MenuQueryVariables,
  variables?: MenuQueryVariables,
  options?: UseInfiniteQueryOptions<MenuQuery, TError, TData>
) =>
  useInfiniteQuery<MenuQuery, TError, TData>(
    variables === undefined ? ['Menu.infinite'] : ['Menu.infinite', variables],
    (metaData) =>
      fetcher<MenuQuery, MenuQueryVariables>(MenuDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options
  );

useInfiniteMenuQuery.getKey = (variables?: MenuQueryVariables) =>
  variables === undefined ? ['Menu.infinite'] : ['Menu.infinite', variables];
useMenuQuery.fetcher = (variables?: MenuQueryVariables) =>
  fetcher<MenuQuery, MenuQueryVariables>(MenuDocument, variables);
export const TopicsDocument = `
    query Topics($pagination: PaginationArg, $filters: TopicFiltersInput, $sort: [String]) {
  topics(pagination: $pagination, filters: $filters, sort: $sort) {
    data {
      ...Topic
    }
    meta {
      ...Meta
    }
  }
}
    ${TopicFragmentDoc}
${FileFragmentDoc}
${MetaFragmentDoc}`;
export const useTopicsQuery = <TData = TopicsQuery, TError = unknown>(
  variables?: TopicsQueryVariables,
  options?: UseQueryOptions<TopicsQuery, TError, TData>
) =>
  useQuery<TopicsQuery, TError, TData>(
    variables === undefined ? ['Topics'] : ['Topics', variables],
    fetcher<TopicsQuery, TopicsQueryVariables>(TopicsDocument, variables),
    options
  );

useTopicsQuery.getKey = (variables?: TopicsQueryVariables) =>
  variables === undefined ? ['Topics'] : ['Topics', variables];
export const useInfiniteTopicsQuery = <TData = TopicsQuery, TError = unknown>(
  pageParamKey: keyof TopicsQueryVariables,
  variables?: TopicsQueryVariables,
  options?: UseInfiniteQueryOptions<TopicsQuery, TError, TData>
) =>
  useInfiniteQuery<TopicsQuery, TError, TData>(
    variables === undefined
      ? ['Topics.infinite']
      : ['Topics.infinite', variables],
    (metaData) =>
      fetcher<TopicsQuery, TopicsQueryVariables>(TopicsDocument, {
        ...variables,
        ...(metaData.pageParam ?? {}),
      })(),
    options
  );

useInfiniteTopicsQuery.getKey = (variables?: TopicsQueryVariables) =>
  variables === undefined
    ? ['Topics.infinite']
    : ['Topics.infinite', variables];
useTopicsQuery.fetcher = (variables?: TopicsQueryVariables) =>
  fetcher<TopicsQuery, TopicsQueryVariables>(TopicsDocument, variables);
