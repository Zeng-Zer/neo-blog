import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ContractsProvider, WithContracts, createClient } from './neo-one';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { AddressString } from '@neo-one/client';

const client = createClient();

type RootState = {
  clientAccount: AddressString | undefined
}

class Root extends Component<any, RootState> {
  readonly state = {
    clientAccount: undefined
  }

  componentDidMount() {
    const comp = this;
    client.currentUserAccount$.subscribe({
      next(account) {
        comp.setState({ clientAccount: account?.id.address });
      }
    });
  }

  render() {
    return (
      <ContractsProvider client={client}>
        <WithContracts>
          {({ blog }) =>
            <App blog={blog} account={this.state.clientAccount} />
          }
        </WithContracts>
      </ContractsProvider>
    );
  }
}

ReactDOM.render(
  <Root />, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
