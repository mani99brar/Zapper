import React from 'react'
import {Reload} from '@web3uikit/icons'
import axios from 'axios'
import { useState } from 'react'

const TransferHistory = ({chain,wallet,transfers,setTransfers}) => {
    async function getTokenHistory(){
        const response = await axios.get("http://localhost:8080/tokenTransfers",{
            params:{
                address: wallet,
                chain:chain,
            }
        });
        setSoff(1);
        console.log(response.data);
        if(response.data){
            setTransfers(response.data);
        }
    }
    const [soff,setSoff]=useState(0);
    return (
    <>
        





        <div className="headls">
            <h1>Token History</h1>
            <Reload onClick={getTokenHistory} fontSize='40px'/>
        </div>
        
        {/* <div className="table">
            <ul className='hd his'>
                <li>Token</li>
                <li>Amount</li>
                <li>From</li>
                <li>To</li>
                <li>Date</li>
            </ul>
            {
                    transfers.length > 0&& transfers.map((e)=>{
                        return(
                            <ul>
                <li>{e.symbols}</li>
                <li>{(Number(e.value)/Number(`1e${e.decimals}`)).toFixed(3)}</li>
                <li>{e.from_address}</li>
                <li>{e.to_address}</li>
                <li>{e.block_timestamp.slice(0,10)}</li>
            </ul>
                           
                        );
                    })
                
                }
       
        </div> */}
        {/* <div>
            <button onClick={getTokenHistory}>Fetch Transfers</button> */}
            <table className={soff===1?'':'nsoff'}>
                <tr className='firstrow'>
                    <th>Token</th>
                    <th>Amount</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                </tr>
                {
                    transfers.length > 0&& transfers.map((e)=>{
                        return(
                            <tr>
                                <td>{e.symbols}</td>
                                <td>
                                    {(Number(e.value)/Number(`1e${e.decimals}`)).toFixed(3)}
                                </td>
                                <td>{e.from_address.slice(0,4)}...{e.from_address.slice(38)}</td>
                                <td>{e.to_address.slice(0,4)}...{e.to_address.slice(38)}</td>
                                <td>{e.block_timestamp.slice(0,10)}</td>
                            </tr>
                        );
                    })
                
                }
            </table>
        {/* </div>
       */}
    </>
  )
}

export default TransferHistory
