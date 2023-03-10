import React from 'react'
import {useState,useEffect} from "react";

const PortfolioValue = ({nativeValue,tokens}) => {
    const  [totalValue,setTotalValue] = useState(0);

    useEffect(()=>{
        let val =0;
        for(let i=0;i<tokens.length;i++){
            val+=Number(tokens[i].val);
        }
        val += Number(nativeValue);
        setTotalValue(val.toFixed(2));
    },[nativeValue, tokens])
  return (
    <>
      <h2>Portfolio Total Value</h2>
      
        <h1>{totalValue}</h1>
      
    </>
  )
}

export default PortfolioValue
