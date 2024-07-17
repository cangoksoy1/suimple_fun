import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Web3 from 'web3';

const App = () => {
  const [tokens, setTokens] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:4000');

    socket.on('newToken', (token) => {
      setTokens((prevTokens) => [...prevTokens, token]);
    });

    socket.on('notification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => socket.disconnect();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletConnected(true);
      } catch (error) {
        console.error('User denied account access');
      }
    } else {
      console.error('No Ethereum provider found');
    }
  };

  return (
    <div>
      <button onClick={connectWallet} style={{ position: 'absolute', top: 20, right: 20 }}>
        {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
      <h1>Welcome to suimple_fun!</h1>
      <div>
        <h2>Tokens</h2>
        {tokens.map((token, index) => (
          <div key={index} className="token">
            <h3>{token.name}</h3>
            <p>{token.description}</p>
          </div>
        ))}
      </div>
      <div>
        <h2>Notifications</h2>
        {notifications.map((notification, index) => (
          <div key={index} className="notification">
            <p>{notification}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
