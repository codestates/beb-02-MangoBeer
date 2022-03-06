require('dotenv').config();
const Web3 = require('web3');
const express = require('express');
const { NftContract } = require('../../models');
const router = express.Router();
const web3 = new Web3(process.env.GANACHE_NETWORK);

router.post('/', async(req, res)=> {
    const erc721abi = require('../../contracts/erc721abi');
    const bytecode = require('../../contracts/erc721bytecode');

    const server = await web3.eth.accounts.wallet.add(process.env.SERVER_PK);

    const myErc721Contract = new web3.eth.Contract(erc721abi);

    let payload = {
        data: bytecode
    };

    let parameter = {
        from: server.address,
        gas: 2000000,
        // gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
    }

    // console.log(payload)
    // myErc721Contract.deploy(payload)
    // .send(parameter, (err, transactionHash) => {
    //     console.log('Transaction Hash :', transactionHash);
    // })

    NftContract.create({
        contractAddr: process.env.ERC721_CONTRACT_ADDR
    })
    .then((temp) => {
        res.status(200).json(temp);
    })

})

module.exports = router;