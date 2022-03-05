require('dotenv').config();
const express = require('express');
const router = express.Router();
const Web3 = require('web3');

const web3 = new Web3('HTTP://127.0.0.1:7545');


router.post('/', async (req, res, next) => {
    const ganache = await web3.eth.accounts.privateKeyToAccount(process.env.GANACHE_PK); // 가나슈 개인키
    const server = await web3.eth.accounts.privateKeyToAccount(process.env.SERVER_PK); // server 개인키
    
    const tx = {
        to: server.address,
        value: web3.utils.toWei('1', 'ether'),
        gas: 2000000
    };

    web3.eth.accounts.signTransaction(tx, ganache.privateKey)
    .then(signed => {
        web3.eth.sendSignedTransaction(signed.rawTransaction)
        .on('receipt', (receipt)=>{
            const msg = 'Succeed in serving 1 ETH.'
            res.status(201).json({receipt, msg});
        })
        .on('error', (error)=> {
            const msg = 'Failed to serve 1 ETH.'
            error = error.toString();
            res.status(500).json({error, msg});
        })
    })

})


module.exports = router;