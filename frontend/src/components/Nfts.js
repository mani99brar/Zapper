import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react';
import { Reload } from '@web3uikit/icons';
import { Input } from '@web3uikit/core';
const Nfts = ({chain,wallet,nfts,setNfts,filteredNfts,setFilteredNfts}) => {
    
    const [nameFIlter,setNameFilter] = useState("");
    const [idFilter,setIdFilter]=useState("");

    useEffect(()=>{
        if(idFilter.length===0 && nameFIlter.length===0){
            return setFilteredNfts(nfts);
        }
        let filNfts =[];
        for(let i=0;i<nfts.length;i++){
            if(
                nfts[i].name.includes(nameFIlter)&&idFilter.length===0
            ){
                filNfts.push(nfts[i]);
            }else if(
                nfts[i].token_id.includes(idFilter) && nameFIlter.length===0
            ){
                filNfts.push(nfts[i]);
            }else if(nfts[i].token_id.includes(idFilter)&&nfts[i].name.includes(nameFIlter)){
                filNfts.push(nfts[i]);
            }
        }
    setFilteredNfts(filNfts);

    },[nameFIlter,idFilter]);

    async function getUserNfts(){
        const response = await axios.get("http://localhost:8080/nftBalance",{
            params:{
                address:wallet,
                chain:chain,
            }
        });
        console.log(response.data);
        if(response.data.result){
            nftProcessing(response.data.result);
        }
    }
    function nftProcessing(t){
        for(let i=0;i<t.length;i++){
            let meta = JSON.parse(t[i].metadata);
            if(meta && meta.image){
                if(meta.image.includes(".")){
                    t[i].image=meta.image;
                }else{
                    t[i].image= "https://ipfs.moralis.io:2053/ipfs/" + meta.image;
                }
            }
            
        }
        setNfts(t);
        setFilteredNfts(t);
    }
    
  
    return (
    <>
    <div className="headls">
            <h1>NFTs</h1>
            <Reload onClick={getUserNfts} fontSize='40px'/>
        </div>
        
        <div className='fliters'>
            <Input
                id="NameF"
                label='Name Filter'
                labelBgColor='none'
                value={nameFIlter}
                style={{}}
                onChange={(e)=> setNameFilter(e.target.value)}

            />
            <Input
                id="IdF"
                label='Id Filter'
                labelBgColor='none'
                value={idFilter}
                style={{}}
                onChange={(e)=> setIdFilter(e.target.value)}

            />
            </div>
            {/* <span>Name Filter</span>
            <input onChange={((e)=>setNameFilter(e.target.value))} value={nameFIlter}></input>
            <span>Id Filter</span>
            <input onChange={((e)=>setIdFilter(e.target.value))} value={idFilter}></input> */}
            <div className="nfts">
            {filteredNfts.length>0 &&
                filteredNfts.map((e)=>{
                    return(
                        <>
                            <div>
                            {e.image && <img src={e.image} width={200}/>}
                            <section>
                                <h2>Name: {e.name}</h2>
                                <p>(ID: {e.token_id.slice(0,5)}...{e.token_id.slice(68)})</p>
                            </section>
                            <br />
                            </div>
                        </>
                    )
                })
            }
            </div>
        
     
    </>
  )
}

export default Nfts