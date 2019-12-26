import { withContracts } from "../neo-one/test";

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

  it('create blog post', async () => {
    await withContracts(async ({ blog, accountIDs, masterAccountID }) => {
      const account = masterAccountID.address;
      const postContent = 'Hello this is my first post !!';
      const receipt = await blog.createPost.confirmed(account, postContent);

      expect(receipt.events).toHaveLength(1);
      let event = receipt.events[0];
      expect(event.name).toEqual('postCreation');
      expect(event.parameters.id.toNumber()).toEqual(0);
      expect(event.parameters.content).toEqual(postContent);
      expect(event.parameters.tipAmount.toNumber()).toEqual(0);
      expect(event.parameters.author).toEqual(account);
      
      const postCount = await blog.postCount();
      expect(postCount.toNumber()).toEqual(1);
    });
  });
});
