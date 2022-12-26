import React from 'react'
import axios from 'axios'
import {Reload} from '@web3uikit/icons'
import { useState } from 'react'


const Tokens = ({wallet,chain,tokens,setTokens}) => {
    
    async function getTokenBalances(){
        const response = await axios.get("http://localhost:8080/tokenBalances",{
            params:{
                address: wallet,
                chain:chain,
            },
        });
        setSoff(1);
        if(response.data){
            let t = response.data;
            for(let i=0;i<t.length;i++){
                t[i].bal = (Number(t[i].balance)/Number(`1E${t[i].decimals}`)).toFixed(3);
                t[i].val = ((Number(t[i].balance)/Number(`1E${t[i].decimals}`))* Number(t[i].usd)).toFixed(2);
            }
            setTokens(t);
            console.log(t);
        }
        
    };
    const [soff,setSoff]=useState(0);
    return (
    <>
    <div className="headls">
            <h1>Token Balance</h1>
            <Reload onClick={getTokenBalances} fontSize='40px'/>
        </div>
        <div className={soff==1?"table soff1":"table"}>
            <ul className='hd'>
                <li>Currency</li>
                <li>Balance</li>
                <li>Value</li>
            </ul>
            {tokens.length>0 &&
            tokens.map((e)=>{
                return (
                    <>
                        <ul>
                <li>{e.symbol}</li>
                <li>{e.bal}</li>
                <li>${e.val}</li>
            </ul>
                    </>
                )
            })
        }
            
        </div>
      {/* <p>
        <button onClick={getTokenBalances}>Get Tokens</button>
        <br />
        {tokens.length>0 &&
            tokens.map((e)=>{
                return (
                    <>
                        <span>
                            {e.symbol} {e.bal},(${e.val})
                        </span>
                        <br />
                    </>
                )
            })
        }
      </p> */}
    </>
  )
}
export default Tokens

