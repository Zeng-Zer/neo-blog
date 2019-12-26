/* @hash f7db7ded8d3ae879b527e8bee9c1a197 */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  Client,
  Event,
  GetOptions,
  InvocationTransaction,
  InvokeReceipt,
  SmartContract,
  TransactionOptions,
  TransactionResult,
} from '@neo-one/client';
import BigNumber from 'bignumber.js';

export interface BlogPostCreationEventParameters {
  readonly id: BigNumber;
  readonly content: string;
  readonly tipAmount: BigNumber;
  readonly author: AddressString;
}
export interface BlogPostCreationEvent extends Event<'postCreation', BlogPostCreationEventParameters> {}
export type BlogEvent = BlogPostCreationEvent;

export interface BlogSmartContract<TClient extends Client = Client> extends SmartContract<TClient, BlogEvent> {
  readonly createPost: {
    (author: AddressString, content: string, options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, BlogEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      author: AddressString,
      content: string,
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, BlogEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly deploy: {
    (options?: TransactionOptions): Promise<
      TransactionResult<InvokeReceipt<boolean, BlogEvent>, InvocationTransaction>
    >;
    readonly confirmed: (
      options?: TransactionOptions & GetOptions,
    ) => Promise<InvokeReceipt<boolean, BlogEvent> & { readonly transaction: InvocationTransaction }>;
  };
  readonly getPost: (
    id: BigNumber,
  ) => Promise<
    | {
        readonly id: BigNumber;
        readonly content: string;
        readonly tipAmount: BigNumber;
        readonly author: AddressString;
      }
    | undefined
  >;
  readonly name: () => Promise<string>;
  readonly postCount: () => Promise<BigNumber>;
}

export interface BlogMigrationSmartContract {
  readonly createPost: (
    author: AddressString | Promise<AddressString>,
    content: string | Promise<string>,
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, BlogEvent> & { readonly transaction: InvocationTransaction }>;
  readonly deploy: (
    options?: TransactionOptions & GetOptions,
  ) => Promise<InvokeReceipt<boolean, BlogEvent> & { readonly transaction: InvocationTransaction }>;
  readonly getPost: (
    id: BigNumber | Promise<BigNumber>,
  ) => Promise<
    | {
        readonly id: BigNumber;
        readonly content: string;
        readonly tipAmount: BigNumber;
        readonly author: AddressString;
      }
    | undefined
  >;
  readonly name: () => Promise<string>;
  readonly postCount: () => Promise<BigNumber>;
}
