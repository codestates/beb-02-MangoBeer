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
        gas: 3000000,
        // gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei'))
    }

    myErc721Contract.deploy(payload)
    .send(parameter, (err, transactionHash) => {
        console.log('ERC721 Deploy Transaction Transaction Hash :', transactionHash);
    })
    .on('receipt', async (receipt) => {
        console.log(receipt.contractAddress);
        const msg = 'Succeed in deploying ERC721 token contract.'
        const newContract = await NftContract.create({ contractAddr: receipt.contractAddress})
        res.status(201).json({receipt, newContract, msg});
    })
    .on('error', (error)=> {
        console.log(error);
        const msg = 'Failed to deploy ERC721 token contract.'
        error = error.toString();
        res.status(500).json({error, msg});
    })

})

module.exports = router;