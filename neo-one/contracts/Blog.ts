import {
  SmartContract,
  Address,
  MapStorage,
  createEventNotifier,
  constant,
  Fixed
} from '@neo-one/smart-contract'


type Post = {
  id: Fixed<0>,
  content: string,
  tipAmount: Fixed<8>,
  author: Address
};

const notifyPostCreation = createEventNotifier<Fixed<0>, string, Fixed<8>, Address>(
  'postCreation',
  'id',
  'content',
  'tipAmount',
  'author'
);

const notifyPostTipped = createEventNotifier<Fixed<0>, string, Fixed<8>, Address>(
  'postTipped',
  'id',
  'content',
  'tipAmount',
  'author'
);

export class Blog extends SmartContract {

  public readonly name: string = "Blog";
  private readonly posts = MapStorage.for<Fixed<0>, Post>();
  private mutablePostCount: Fixed<0> = 0;

  @constant
  public postCount(): Fixed<0> {
    return this.mutablePostCount;
  }

  @constant
  public getPost(id: Fixed<0>): Post | undefined {
    return this.posts.get(id);
  }

  public createPost(author: Address, content: string): true {
    if (!Address.isCaller(author)) {
      throw new Error('Expected Author to be the caller');
    }
    if (content === '') {
      throw new Error('Post content cannot be null');
    }

    this.mutablePostCount += 1;

    const post: Post = {
      id: this.mutablePostCount,
      content: content,
      tipAmount: 0,
      author: author
    };

    this.posts.set(this.mutablePostCount, post);
    notifyPostCreation(post.id, post.content, post.tipAmount, post.author);
    return true;
  }

  public tipPost(from: Address, postId: Fixed<0>, tipAmount: Fixed<8>): true {
    if (!Address.isCaller(from)) {
      throw new Error('Expected tipper to be the caller');
    }
    if (tipAmount <= 0) {
      throw new Error('Please tip a positive amount of money');
    }
    let post = this.getPost(postId);
    if (post === undefined) {
      throw new Error('Post must not be undefined');
    }

    // For some reason this is not working
    // const token = LinkedSmartContract.for<Token>();
    // if (!token.removeTokens(from, tipAmount)) {
    //   throw new Error('Couldn\'t transfer tokens');
    // }

    // Transfer tip amount
    post.tipAmount += tipAmount;
  
    // Set new post
    this.posts.set(postId, post);

    // Tip event
    notifyPostTipped(post.id, post.content, post.tipAmount, post.author);
    return true;
  }
}