require('dotenv').config();
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const erc20abi = require('../../contracts/erc20abi');

const web3 = new Web3('HTTP://127.0.0.1:7545');

router.get('/', (req, res)=> {
    res.send('here in forEther api');
});

// 서버 계정 이더 잔액 불러오기
router.get('/serverEthBalance', (req, res)=> {
    web3.eth.getBalance(process.env.SERVER_ADDR, (error, result) => {
        if(error){
            const msg = 'Failed to get server ETH balance.'
            error = error.toString();
            res.status(500).json({error, msg});
         }
         else{
            const balance = web3.utils.fromWei(String(result));
            const msg = 'Succeed in getting server ETH balance.'
            res.status(200).json({balance, msg});
         }
    })
});

// 가나슈 계정 갖고오기
router.get('/ganacheAccount', (req, res) => {
    web3.eth.getAccounts()
    .then((accounts) => res.status(200).json({accounts, msg: 'Succeed in getting GANACHE accounts'}));

});

// erc20 토큰 보유 개수 가져오기. params(account) 없으면 전체 erc20 개수 불러옴
router.get('/totalSupply', async (req, res) => {
    const {account} = req.query;

    const myErc20Contract = await new web3.eth.Contract(erc20abi, process.env.CONTRACT_ADDR, {
        from: process.env.SERVER_ADDR // server Addr
    }); 

    var totalSupply; 
    var msg;

    try{
        if(account == undefined){
            totalSupply = await myErc20Contract.methods.totalSupply().call();
            msg = 'Succeed in getting total supply of ERC20 Token.';
        }
        else{
            totalSupply = await myErc20Contract.methods.balanceOf(account).call();
            msg = 'Succeed in getting balance of user.';
        }
    
        res.status(200).json({totalSupply, msg});
    }
    catch(error) {
        msg = 'Failed to get supply of ERC20 Token';
        error = error.toString();
        res.status(500).json({error, msg});
    }

});

// erc20 approve된 토큰 개수 가져오기. 
router.get('/allowance', async (req, res) => {
    const {account} = req.query;

    const myErc20Contract = await new web3.eth.Contract(erc20abi, process.env.CONTRACT_ADDR, {
        from: process.env.SERVER_ADDR // server Addr
    }); 

    try{
        const Allowance = await myErc20Contract.methods.allowance(account, process.env.SERVER_ADDR).call();
        const msg = 'Succeed in getting allowance of user';
        res.status(200).json({Allowance, msg});
    }
    catch(error){
        msg = 'Failed to get allowance of user';
        error = error.toString();
        res.status(500).json({error, msg});
    }


});

module.exports = router;