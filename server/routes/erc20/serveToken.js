require('dotenv').config();
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const erc20abi = require('../contracts/erc20abi');

const web3 = new Web3('HTTP://127.0.0.1:7545');

router.post('/', async (req, res) => {
    const {to} = req.body;
    const value = '1000000000000000000'; // decimal : 18

    const server = await web3.eth.accounts.privateKeyToAccount(process.env.SERVER_PK); // server 개인키

    const myErc20Contract = await new web3.eth.Contract(erc20abi, process.env.CONTRACT_ADDR, {
        from: server.address // server Addr
    }); 

    const data = myErc20Contract.methods.transfer(to, value).encodeABI();
    
    const tx = {
        to: process.env.CONTRACT_ADDR,
        gas: 2000000,
        data: data
    };

    web3.eth.accounts.signTransaction(tx, server.privateKey)
    .then(signed => {
        web3.eth.sendSignedTransaction(signed.rawTransaction)
        .on('receipt', (receipt)=>{
            console.log(receipt);
            res.json(receipt);
        })
    })

})


module.exports = router;