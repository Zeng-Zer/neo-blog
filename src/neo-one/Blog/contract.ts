/* @hash d6b5b5e90bfc4048d570509a4b1f34c9 */
// tslint:disable
/* eslint-disable */
import { Client } from '@neo-one/client';
import { BlogSmartContract } from './types';
import { blogABI } from './abi';
import { sourceMaps } from '../sourceMaps';

const definition = {
  networks: {
    local: {
      address: 'AbUoffy7MVF5deXAu9ywiRhzGZFo5qbCCJ',
    },
  },
  abi: blogABI,
  sourceMaps,
};

export const createBlogSmartContract = <TClient extends Client>(client: TClient): BlogSmartContract<TClient> =>
  client.smartContract(definition);
