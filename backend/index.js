
const express = require('express')
const app = express()
const cors  = require("cors");
const port = 8080;
const Moralis = require("moralis").default;
require("dotenv").config();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/nativeBalance',async (req,res)=>{

    await Moralis.start({apiKey: process.env.MORALIS_API_KEY});
    console.log(req.query);

    try{
      const {address,chain} = req.query;
      
      const response = await Moralis.EvmApi.balance.getNativeBalance({
        address,
        chain,
      });
      
      const  nativeBalance = response.data;
      let nativeCurrency;
      if(chain==="0x1"){
        
        nativeCurrency = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
      } else if(chain === "0x89"){
        nativeCurrency = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
      }
      const nativePrice = await Moralis.EvmApi.token.getTokenPrice({
        address:nativeCurrency,
        chain,
      });

      nativeBalance.usd = nativePrice.data.usdPrice;
      console.log(nativeBalance);
      res.send(nativeBalance);
    }
    catch(e){
      res.send(e);
    }
});
app.get('/tokenBalances',async (req,res)=>{

  await Moralis.start({apiKey: process.env.MORALIS_API_KEY});
  try{
    const {address,chain} = req.query;
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    });
    let tokens = response.data;
    let legitTokens = [];
    for(let i=0 ; i< tokens.length;i++){
      const priceResponse = await Moralis.EvmApi.token.getTokenPrice({
        address: tokens[i].token_address,
        chain:chain,
      });
     
      if(priceResponse.data.usdPrice>0.001){
        tokens[i].usd = priceResponse.data.usdPrice;
        legitTokens.push(tokens[i]);
      }
    }
    res.send(legitTokens);
    // http://localhost:8080/tokenBalances?address=0x9233d7CE2740D5400e95C1F441E5B575BDd38d82&chain=0x89
  }
  // 9233d7CE2740D5400e95C1F441E5B575BDd38d82
  catch(e){
    res.send(e);
  }
});

app.get('/tokenTransfers',async (req,res)=>{

  await Moralis.start({apiKey: process.env.MORALIS_API_KEY});

  try{
    const {address,chain} = req.query;
    const response = await Moralis.EvmApi.token.getWalletTokenTransfers({
      address,
      chain,
    });
    const userTrans = response.data.result;
    let userTransDetails = [];
    for(let i=0;i<userTrans.length;i++){
      const metaResponse = await Moralis.EvmApi.token.getTokenMetadata({
        addresses : [userTrans[i].address],
        chain:chain,
      })
      if(metaResponse.data){
        userTrans[i].decimals = metaResponse.data[0].decimals;
        userTrans[i].symbols = metaResponse.data[0].symbol;
        userTransDetails.push(userTrans[i]);
      }else{
        console.log("no details for coin");
      }
    }
    res.send(userTransDetails);
    // http://localhost:8080/tokenBalances?address=0x9233d7CE2740D5400e95C1F441E5B575BDd38d82&chain=0x89
  }
  // 9233d7CE2740D5400e95C1F441E5B575BDd38d82
  catch(e){
    res.send(e);
  }
});

app.get('/nftBalance',async (req,res)=>{

  await Moralis.start({apiKey: process.env.MORALIS_API_KEY});

  try{
    const {address,chain} = req.query;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });
    res.send(response.data);
    
    // http://localhost:8080/tokenBalances?address=0x9233d7CE2740D5400e95C1F441E5B575BDd38d82&chain=0x89
  }
  // 9233d7CE2740D5400e95C1F441E5B575BDd38d82
  catch(e){
    res.send(e);
  }
});