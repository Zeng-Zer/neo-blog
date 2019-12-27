import React, { Component } from 'react';
import './App.css';
import { BlogSmartContract } from '../neo-one';
import { AddressString } from '@neo-one/client';
import Navbar from './Navbar';
import Main from './Main';
import BigNumber from 'bignumber.js'

export type Post = {
    id: BigNumber,
    content: string,
    tipAmount:BigNumber,
    author: string
}

type AppProps = {
  blog: BlogSmartContract,
  account: AddressString | undefined
}

type AppState = {
  loading: boolean,
  postCount: number,
  posts: Post[]
}

export default class App extends Component<AppProps, AppState> {

  readonly state: AppState = {
    loading: true,
    postCount: 0,
    posts: []
  }

  componentDidUpdate(prevProps: AppProps) {
    if (this.props.account !== prevProps.account) {
      this.loadPosts();
    }
  }

  async componentDidMount() {
    // Bind this
    this.createPost = this.createPost.bind(this);

    // Load posts
    this.loadPosts();
  }

  async loadPosts() {
    this.setState({loading: true});
    const postCount = await this.props.blog.postCount();
    this.setState({postCount: postCount.toNumber()});
    const posts = (await Promise.all(Array.from(Array(this.state.postCount).keys())
      .map(x => {
        return this.props.blog.getPost(new BigNumber(x));
      })))
      .filter(x => x !== undefined)
      .map(x => (x as Post));
    this.setState({ posts });
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <Navbar account={this.props.account} />
        <div className="App">
          <header className="App-header">
            {this.state.loading
              ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
              : <Main
                posts={this.state.posts}
                createPost={this.createPost}
              />
            }
          </header>
        </div>
      </div>
    );
  }

  createPost(content: string) {
    const blog = this.props.blog;
    const account = this.props.account
    if (account === undefined) {
      alert('Error: User isn\'t logged in');
    } else {
      blog.createPost.confirmed(account, content).then((post) => {
        console.log(post);
        this.loadPosts();
      });
    }
  }
}