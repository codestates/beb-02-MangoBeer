require('dotenv').config();
const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const erc20abi = require('../../contracts/erc20abi');

const web3 = new Web3(process.env.GANACHE_NETWORK);

router.post('/', async (req, res) => {
    const {to, amount} = req.body;
    console.log('to:', to);
    console.log('amount: ', amount);

    const myErc20Contract = await new web3.eth.Contract(erc20abi, process.env.CONTRACT_ADDR, {
        from: process.env.SERVER_ADDR // server Addr
    }); 

    const server = await web3.eth.accounts.wallet.add(process.env.SERVER_PK);

    await myErc20Contract.methods.mintToken(to, amount).send(
        {from: server.address, to: process.env.CONTRACT_ADDR, gasPrice: 100, gas: 2000000},
    )
    .on('receipt', (receipt)=>{
        const msg = 'Succeed in minting new ERC20 Token.';
        res.status(201).json({receipt, msg});
    })
    .on('error', (error) => {
        error = error.toString();
        const msg = 'Failed to mint new ERC20 Token.';
        res.status(500).send({error, msg});
    });

})

module.exports = router;