const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { Contract } = require('../../models');

const web3 = new Web3('HTTP://127.0.0.1:7545');

router.post("/", async (req, res)=>{
    const bytecode = require('../../contracts/erc20bytecode');
    const abi = require('../../contracts/erc20abi');
    
    const server = await web3.eth.accounts.wallet.add(process.env.SERVER_PK); // server 개인키
    // 지갑 안에 어카운트 추가
    // 'TXRejectedError: sender account not recognized at StateManager.queueTransaction' 에러 해결
    const myErc20Contract = new web3.eth.Contract(abi); 
    
    let payload = { data : bytecode };

    let parameter = {
        from: server.address,
        gas: 2000000,

    }

    myErc20Contract.deploy(payload)
    .send(parameter, (err, transactionHash) => {
        console.log('Transaction Hash :', transactionHash);
    })
    .on('receipt', async (receipt) => {
        // console.log(receipt.contractAddress);
        const msg = 'Succeed in deploying ERC20 token contract.'
        const newContract = await Contract.create({ contractAddr: receipt.contractAddress})
        res.status(201).json({receipt, newContract, msg});
    })
    .on('error', (error)=> {
        const msg = 'Failed to deploy ERC20 token contract.'
        error = error.toString();
        res.status(500).json({error, msg});
    })
})

module.exports = router;