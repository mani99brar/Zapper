import React from 'react'
import "../App.css";
import {Input,Select,CryptoLogos} from '@web3uikit/core';
const WalletInputs = ({chain,setChain,wallet,setWallet}) => {
  
  return (
    <>
        <div className="header">
          <div className="con">
          <div className="title">
          <h1>Zapper</h1>
          </div>
          <div className="walinp">
            {/* <input
              onChange={(e)=>setWallet(e.target.value)}
              value={wallet}
            >            
            </input>
            <select onChange={(e) => setChain(e.target.value)} value={chain}>
              <option value="0x1">ETH</option>
              <option value="0x89">Polygon</option>
            </select> */}
              <Input 
                id='Wallet'
                label='Wallet Address'
                labelBgColor='rgb(33,33,38)'
                value={wallet}
                style={{height:"50px"}}
                onChange={(e)=>setWallet(e.target.value)}
              />
              <Select
              defaultOptionIndex={0}
              id="Chain"
              onChange={(e)=>setChain(e.value)}
              options={[
                {
                  id:'eth',
                  label: 'Etherium',
                  value: '0x1',
                  prefix: <CryptoLogos chain='ethereum'/>
                },
                {
                  id: 'matic',
                  label: 'Polygon',
                  value: '0x89',
                  prefix: <CryptoLogos chain = 'polygon'/>
                }
              ]}
              />
          </div>
          </div>
          
        </div>
    </>
  )
}

export default WalletInputs
