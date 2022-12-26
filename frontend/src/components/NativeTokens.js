import React from 'react'
import axios from 'axios'
import {Reload} from '@web3uikit/icons'
import { useState } from 'react';


function NativeTokens({wallet,chain,nativeBalance,nativeValue,setNativeBalance,setNativeValue}) {
    async function getNativeBalance(){
        const response = await axios.get("http://localhost:8080/nativeBalance",{
            params:{
                address:wallet,
                chain: chain,
            },
        });
        setSoff(1);
        console.log(response.data);
        if(response.data.balance && response.data.usd){
            setNativeBalance((Number(response.data.balance)/1e18).toFixed(3));
            setNativeValue(((Number(response.data.balance)/1e18)*Number(response.data.usd)).toFixed(2));
        }

    }
    const [soff,setSoff]= useState(0);
    
  return (
    <>
        <div className="headls">
            <h1>Native Balance</h1>
            <Reload onClick={getNativeBalance} fontSize='40px'/>
        </div>
        
        <div className={soff===1 ? "table soff1" : "table"}>
            <ul className='hd'>
                <li>Currency</li>
                <li>Balance</li>
                <li>Value</li>
            </ul>
            <ul>
                <li>Native</li>
                <li>{nativeBalance}</li>
                <li>${nativeValue}</li>
            </ul>
        </div>
        {/* <p>
            <br />
            <span>
                Native Balance : {nativeBalance},(${nativeValue})
            </span>
        </p> */}
    </>
  )
}

export default NativeTokens


