import React from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { useSuiClientQuery } from '@mysten/sui';

function App() {
  const account = useCurrentAccount();

  if (!account) {
    return (
      <div className="App">
        <header className="App-header">
          <ConnectButton />
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <ConnectButton />
      </header>
      <div>
        Connected to {account.address}
      </div>
      <OwnedObjects address={account.address} />
    </div>
  );
}

function OwnedObjects({ address }) {
  const { data } = useSuiClientQuery('getOwnedObjects', { owner: address });

  if (!data) {
    return null;
  }

  return (
    <ul>
      {data.data.map((object) => (
        <li key={object.data?.objectId}>
          <a href={`https://example-explorer.com/object/${object.data?.objectId}`}>
            {object.data?.objectId}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default App;
