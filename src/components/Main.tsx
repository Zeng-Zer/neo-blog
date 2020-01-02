import React, { Component } from 'react';
import Identicon from 'identicon.js';
import { Post } from './App'
import BigNumber from 'bignumber.js';

type MainProps = {
  posts: Post[],
  accountTokens: number,
  createPost: () => {},
  tipPost: (postId: string, amount: BigNumber) => {},
  getTokens: (amount: BigNumber) => {}
}

export default class Main extends Component<any, MainProps> {

  private postContent: HTMLInputElement | null = null

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>

            <div className="content mr-auto ml-auto">
              <div className="card mb-4">
                Account value: {this.props.accountTokens}
                <button
                  className="btn btn-link btn-sm float-middle mt-1"
                  onClick={(event) => {
                    this.props.getTokens(new BigNumber(1000));
                  }}
                >
                  Get 1000 Tokens
                </button>
              </div>
            </div>

            <form onSubmit={(event) => {
              event.preventDefault();
              const content = this.postContent?.value;
              this.props.createPost(content);
            }}>
              <div className="form-group mr-sm-2">
                <input
                  id="postContent"
                  type="text"
                  ref={(input) => { this.postContent = input }}
                  className="form-control"
                  placeholder="What's on your mind?"
                  required />
                <button type="submit" className="btn btn-primary btn-block">Share</button>
              </div>
            </form>
            <div className="content mr-auto ml-auto">
              {this.props.posts.map((post: Post) => {
                const key = post.id.toNumber();
                return (
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                      />
                      <small className="text-muted">{post.author}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>{post.content}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {post.tipAmount.toString()} TOKEN
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right mt-1"
                          onClick={(event) => {
                            const tipAmount = new BigNumber(1);
                            this.props.tipPost(post.id, tipAmount);
                          }}
                        >
                          TIP {1} TOKEN
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}