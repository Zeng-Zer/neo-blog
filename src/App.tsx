import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { WithContracts, BlogSmartContract } from './neo-one';
import { Client } from '@neo-one/client';

class App extends Component {
  render() {
    return (
      <WithContracts>
        {({ blog, client }) =>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <div onClick={() => this.createPost(blog, client)}>Withdraw</div>
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
        }
      </WithContracts>
    );
  }

  createPost(blog: BlogSmartContract, client: Client) {
    const authorAddress = client.getCurrentUserAccount()?.id.address
    if (authorAddress === undefined) {
      alert('Error: User isn\'t logged in');
      return;
    }
    blog.createPost.confirmed(authorAddress, 'hello world').then((post) => {
      console.log(post);
    });
  }
}

export default App;
