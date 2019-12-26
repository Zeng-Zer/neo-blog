/* @hash 6b3ec4dae75da80b38e9cea395528930 */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';

import { BlogSmartContract, BlogMigrationSmartContract } from './Blog/types';

import { createBlogSmartContract } from './Blog/contract';

export interface Contracts<TClient extends Client = Client> {
  readonly blog: BlogSmartContract<TClient>;
}

export interface MigrationContracts {
  readonly blog: BlogMigrationSmartContract;
}

export const createContracts = <TClient extends Client>(client: TClient): Contracts<TClient> => ({
  blog: createBlogSmartContract(client),
});
