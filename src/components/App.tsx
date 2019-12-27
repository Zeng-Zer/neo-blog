import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { BlogSmartContract } from '../neo-one';
import { AddressString } from '@neo-one/client';
import Navbar from './Navbar';

interface AppProps {
  blog: BlogSmartContract,
  account: AddressString | undefined
}

export default class App extends Component<AppProps> {

  render() {
    return (
      <div>
        <Navbar account={this.props.account} />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div onClick={() => this.createPost()}>Withdraw</div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </div>
    );
  }

  createPost() {
    const blog = this.props.blog;
    const account = this.props.account
    if (account === undefined) {
      alert('Error: User isn\'t logged in');
    } else {
      blog.createPost.confirmed(account, 'hello world').then((post) => {
        console.log(post);
      });
    }
  }
}