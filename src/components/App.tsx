import React, { Component } from 'react';
import './App.css';
import { BlogSmartContract, TokenSmartContract } from '../neo-one';
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
  token: TokenSmartContract,
  blog: BlogSmartContract,
  account: AddressString | undefined
}

type AppState = {
  loading: boolean,
  postCount: number,
  accountTokens: number,
  posts: Post[]
}

export default class App extends Component<AppProps, AppState> {

  readonly state: AppState = {
    loading: true,
    postCount: 0,
    accountTokens: 0,
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
    this.tipPost = this.tipPost.bind(this);
    this.getTokens = this.getTokens.bind(this);

    // Load posts
    this.loadPosts();
  }

  async loadPosts() {
    this.setState({loading: true});

    
    const accountTokens = this.props.account !== undefined ? (await this.props.token.balanceOf(this.props.account)).toNumber() : 0;
    this.setState({accountTokens: accountTokens });
    const postCount = await this.props.blog.postCount();
    this.setState({postCount: postCount.toNumber()});
    const posts = (await Promise.all(Array.from(Array(this.state.postCount + 1).keys())
      .map(x => {
        return this.props.blog.getPost(new BigNumber(x));
      })))
      .filter(x => {
        return x !== undefined;
      })
      .map(x => {
        return x as Post;
      });
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
                  accountTokens={this.state.accountTokens}
                  createPost={this.createPost}
                  tipPost={this.tipPost}
                  getTokens={this.getTokens}
                />
            }
          </header>
        </div>
      </div>
    );
  }

  createPost(content: string) {
    const blog = this.props.blog;
    const account = this.props.account;
    if (account === undefined) {
      alert('Error: User isn\'t logged in');
    } else {
      blog.createPost.confirmed(account, content)
        .then(() => {
          this.loadPosts();
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  tipPost(postId: BigNumber, tipAmount: BigNumber) {
    const token = this.props.token;
    const blog = this.props.blog;
    const account = this.props.account;
    if (account === undefined) {
      alert('Error: User isn\'t logged in');
    } else {
      token.removeTokens.confirmed(account, tipAmount)
        .then(() => {
          return blog.tipPost.confirmed(account, postId, tipAmount);
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          this.loadPosts();
        });
    }
  }

  getTokens(amount: BigNumber) {
    const token = this.props.token;
    const account = this.props.account;
    if (account === undefined) {
      alert('Error: User isn\'t logged in');
    } else {
      token.provide.confirmed(account, amount)
        .then(() => {
          this.loadPosts();
        })
        .catch((error) => {
          alert(error);
        });
    }
  }
}