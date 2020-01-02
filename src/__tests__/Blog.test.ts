import BigNumber from 'bignumber.js';
import { withContracts } from '../neo-one/test';

jest.setTimeout(60000);

describe('Blog', () => {
  it('the blog properties', async () => {
    await withContracts(async ({ blog }) => {
      const [name, postCount] = await Promise.all([
        blog.name(),
        blog.postCount()
      ]);

      expect(name).toEqual('Blog');
      expect(postCount.toNumber()).toEqual(0);
    });
  });

  it('create blog post and tip', async () => {
    await withContracts(async ({ blog, token, accountIDs, masterAccountID }) => {
      const account = masterAccountID.address;
      const postContent = 'Hello this is my first post !!';
      let receipt = await blog.createPost.confirmed(account, postContent);

      expect(receipt.events).toHaveLength(1);
      let event = receipt.events[0];
      expect(event.name).toEqual('postCreation');
      expect(event.parameters.id.toNumber()).toEqual(1);
      expect(event.parameters.content).toEqual(postContent);
      expect(event.parameters.tipAmount.toNumber()).toEqual(0);
      expect(event.parameters.author).toEqual(account);
      
      const postCount = await blog.postCount();
      expect(postCount.toNumber()).toEqual(1);

      // Tip one token
      const tipAmount = new BigNumber(1);
      // Provide enough tokens to tip a post
      await token.issue.confirmed(account, tipAmount);
      receipt = await blog.tipPost.confirmed(account, event.parameters.id, tipAmount);
      
      event = receipt.events[3];
      expect(event.name).toEqual('postTipped');
      expect(event.parameters.id.toNumber()).toEqual(1);
      expect(event.parameters.content).toEqual(postContent);
      expect(event.parameters.tipAmount).toEqual(tipAmount);
      expect(event.parameters.author).toEqual(account);
    });
  });
  
});
