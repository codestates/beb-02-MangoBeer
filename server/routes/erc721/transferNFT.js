/* global BigInt */

require('dotenv').config();
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { Nft, User } = require('../../models')

const web3 = new Web3(process.env.GANACHE_NETWORK);

const erc721abi = require('../../contracts/erc721_1abi');
const erc20abi = require('../../contracts/erc20abi');

router.post('/', async (req, res) => {
    const {from, to, tokenId} = req.body;

    const NFT = await Nft.findOne({
        where: {id: tokenId}
    });

    const TO = await User.findOne({
        where: {address: to}
    });

    console.log(TO);

    var price = BigInt(NFT.nftprice);
    price *= 1000000000000000000n;
    price = String(price);

    const myErc721Contract = await new web3.eth.Contract(erc721abi, process.env.ERC721_CONTRACT_ADDR);
    const myErc20Contract = await new web3.eth.Contract(erc20abi, process.env.CONTRACT_ADDR, {
        from: process.env.SERVER_ADDR // server Addr
    }); 
    
    const server = await web3.eth.accounts.wallet.add(process.env.SERVER_PK);

    // 먼저, 1. 잔액 확인
    var to_bal = await myErc20Contract.methods.allowance(to, server.address).call();

    console.log('to bal: ', to_bal);
    
    if(Number(price) > Number(to_bal)) {
        return res.status(400).send('Insufficient ERC20 Mango Token'); // 잔액 부족
    }

    // 2. 토큰 전송
    const resultOfERC20 = await myErc20Contract.methods.transferEach(to, from, price).send(
        {from: server.address, to: process.env.CONTRACT_ADDR, gasPrice: 100, gas: 2000000}
    )
    .on('error', (error) => {
        error = error.toString();
        const msg = 'Failed to transfer ERC20 Token between users.';
        res.status(400).send({error, msg});
    })
    
    console.log('망고 전송 Tx: ', resultOfERC20.transactionHash);

    // 3. NFT 이동
    const resultOfERC721 = await myErc721Contract.methods.transferEach(from, to, tokenId).send(
        {from: server.address, to: process.env.ERC721_CONTRACT_ADDR, gasPrice: 100, gas: 2000000},
    )
    .on('error', (error) => {
        error = error.toString();
        const msg = 'Failed to transfer ERC721 Token between users.';
        //res.status(500).send({error, msg});
    });

    console.log('NFT 이동 Tx: ', resultOfERC721);

    await NFT.update({ sellingflag: false, useraddr: to, username: TO.userName });
    await NFT.save();

    res.status(201).json({resultOfERC20, resultOfERC721, NFT});
})

module.exports = router;