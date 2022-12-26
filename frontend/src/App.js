import './App.css';
import axios from 'axios';
import { useState } from "react";
import WalletInputs from './components/WalletInputs';
import NativeTokens from './components/NativeTokens';
import Tokens from './components/Tokens';
import PortfolioValue from './components/PortfolioValue';
import TransferHistory from './components/TransferHistory';
import Nfts from './components/Nfts'
import { Avatar, Tablist, Tab } from '@web3uikit/core';
function App() {
  const [wallet, setWallet] = useState("");
  const [selectedKey, setSelectedKey] = useState("");
  const [chain, setChain] = useState("");
  const [nativeBalance, setNativeBalance] = useState("");
  const [nativeValue, setNativeValue] = useState("");
  const [tokens, setTokens] = useState("");
  const [transfers, setTransfers] = useState("");
  const [nfts, setNfts] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [tabState, setTabState] = useState(0);

  return (
    <div className="App">
      <div className="bgcover"></div>
      <WalletInputs
        chain={chain}
        setChain={setChain}
        wallet={wallet}
        setWallet={setWallet}
      />

    <div className="profile">
      <div className="avatar">
        {wallet.length===42 &&(
          <>
            <div>
              <Avatar isRounded size={130} theme="image" />
              <h2>{wallet.slice(0,6)}...{wallet.slice(36)}</h2>
            </div>
          </>
        )}
      </div>
      <div className='totalvalue'>
      <PortfolioValue
        nativeValue={nativeValue}
        tokens={tokens}
      />
      </div>
      

    </div>
      

      <div className='content'>
        
        <ul>
          <li
            className={tabState === 1 ? "act-tab tab" : "tab"}
            onClick={() => setTabState(1)}
          >Tokens</li>
          <li
            className={tabState === 2 ? "act-tab tab" : "tab"}
            onClick={() => setTabState(2)}
          >Transfers</li>
          <li
            className={tabState === 3 ? "act-tab tab" : "tab"}
            onClick={() => setTabState(3)}
          >Nfts</li>
        </ul>
        <div
          className={tabState === 1 ? "act-cont" : "cont"}
        >
          <NativeTokens
            chain={chain}
            setNativeBalance={setNativeBalance}
            wallet={wallet}
            setNativeValue={setNativeValue}
            nativeBalance={nativeBalance}
            nativeValue={nativeValue}

          />
          <Tokens
            wallet={wallet}
            chain={chain}
            tokens={tokens}
            setTokens={setTokens}
          />

        </div>
        <div
          className={tabState === 2 ? "act-cont" : "cont"}
        >


          <TransferHistory
            chain={chain}
            wallet={wallet}
            transfers={transfers}
            setTransfers={setTransfers}
          />

        </div>
        <div
          className={tabState === 3 ? "act-cont" : "cont"}
        >

          <Nfts
            wallet={wallet}
            chain={chain}
            nfts={nfts}
            setNfts={setNfts}
            setFilteredNfts={setFilteredNfts}
            filteredNfts={filteredNfts}
          />
        </div>









      </div>


    </div>
  );
}

export default App;
