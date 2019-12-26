/* @hash d9665b4330647ebc8919339f871280cd */
// tslint:disable
/* eslint-disable */
import { ABI } from '@neo-one/client';

export const blogABI: ABI = {
  events: [
    {
      name: 'postCreation',
      parameters: [
        {
          decimals: 0,
          forwardedValue: false,
          name: 'id',
          optional: false,
          type: 'Integer',
        },
        {
          forwardedValue: false,
          name: 'content',
          optional: false,
          type: 'String',
        },
        {
          decimals: 0,
          forwardedValue: false,
          name: 'tipAmount',
          optional: false,
          type: 'Integer',
        },
        {
          forwardedValue: false,
          name: 'author',
          optional: false,
          type: 'Address',
        },
      ],
    },
  ],
  functions: [
    {
      constant: true,
      name: 'name',
      parameters: [],
      returnType: {
        forwardedValue: false,
        optional: false,
        type: 'String',
      },
    },
    {
      claim: false,
      constant: true,
      name: 'postCount',
      parameters: [],
      receive: false,
      returnType: {
        decimals: 0,
        forwardedValue: false,
        optional: false,
        type: 'Integer',
      },
      send: false,
      sendUnsafe: false,
    },
    {
      claim: false,
      constant: true,
      name: 'getPost',
      parameters: [
        {
          decimals: 0,
          forwardedValue: false,
          name: 'id',
          optional: false,
          type: 'Integer',
        },
      ],
      receive: false,
      returnType: {
        forwardedValue: false,
        optional: true,
        properties: {
          author: {
            forwardedValue: false,
            optional: false,
            type: 'Address',
          },
          content: {
            forwardedValue: false,
            optional: false,
            type: 'String',
          },
          id: {
            decimals: 0,
            forwardedValue: false,
            optional: false,
            type: 'Integer',
          },
          tipAmount: {
            decimals: 0,
            forwardedValue: false,
            optional: false,
            type: 'Integer',
          },
        },
        type: 'Object',
      },
      send: false,
      sendUnsafe: false,
    },
    {
      claim: false,
      constant: false,
      name: 'createPost',
      parameters: [
        {
          forwardedValue: false,
          name: 'author',
          optional: false,
          type: 'Address',
        },
        {
          forwardedValue: false,
          name: 'content',
          optional: false,
          type: 'String',
        },
      ],
      receive: false,
      returnType: {
        forwardedValue: false,
        optional: false,
        type: 'Boolean',
      },
      send: false,
      sendUnsafe: false,
    },
    {
      name: 'deploy',
      parameters: [],
      returnType: {
        type: 'Boolean',
      },
    },
  ],
};
