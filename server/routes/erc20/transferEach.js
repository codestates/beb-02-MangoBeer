require('dotenv').config();
const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const erc20abi = require('../../contracts/erc20abi');

const web3 = new Web3(process.env.GANACHE_NETWORK);

router.post('/', async (req, res) => {
    const {from, to, amount} = req.body;
    console.log('from: ', from);
    console.log('to:', to);
    console.log('amount: ', amount);

    const myErc20Contract = await new web3.eth.Contract(erc20abi, process.env.CONTRACT_ADDR, {
        from: process.env.SERVER_ADDR // server Addr
    }); 

    const server = await web3.eth.accounts.wallet.add(process.env.SERVER_PK);

    // (1) 토큰 보내기 전에 잔액 확인
    var from_bal = await myErc20Contract.methods.allowance(from, server.address).call();
    var to_bal = await myErc20Contract.methods.allowance(to, server.address).call();

    console.log('from bal: ', from_bal);
    console.log('to_bal: ', to_bal);

    if(Number(amount) > Number(from_bal)) {
        res.status(400).json('Insufficient Token'); // 잔액 부족
    }
    
    // (2) transfer 함수 실행
    await myErc20Contract.methods.transferEach(from, to, amount).send(
        {from: server.address, to: process.env.CONTRACT_ADDR, gasPrice: 100, gas: 2000000}
    )
    .on('receipt', (receipt)=>{
        const msg = 'Succeed in transfering ERC20 Token between users.';
        res.status(201).json({receipt, msg});
    })
    .on('error', (error) => {
        error = error.toString();
        const msg = 'Failed to transfer ERC20 Token between users.';
        res.status(400).send({error, msg});
    })

})

module.exports = router;
