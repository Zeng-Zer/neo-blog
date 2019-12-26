import { SmartContract, Address, MapStorage, createEventNotifier, constant } from '@neo-one/smart-contract'

type Post = {
    id: number,
    content: string,
    tipAmount: number,
    author: Address
};

const notifyPostCreation = createEventNotifier<number, string, number, Address>(
    'postCreation',
    'id',
    'content',
    'tipAmount',
    'author'
);

export class Blog extends SmartContract {

    public readonly name: string = "Blog";
    private readonly posts = MapStorage.for<number, Post>();
    private mutablePostCount: number = 0;

    @constant
    public postCount(): number {
        return this.mutablePostCount;
    }

    @constant
    public getPost(id: number): Post | undefined {
        return this.posts.get(id);
    }

    public createPost(author: Address, content: string): true {
        if (!Address.isCaller(author)) {
            throw new Error('Expected Author to be the caller');
        }
        if (content === '') {
            throw new Error('Post content cannot be null');
        }

        const post: Post = {
            id: this.mutablePostCount,
            content: content,
            tipAmount: 0,
            author: author
        };

        this.posts.set(this.mutablePostCount, post);
        this.mutablePostCount++;
        notifyPostCreation(post.id, post.content, post.tipAmount, post.author);
        return true;
    }
}