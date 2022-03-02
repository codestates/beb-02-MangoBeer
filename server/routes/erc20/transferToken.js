require('dotenv').config();
const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const erc20abi = require('../contracts/erc20abi');

const web3 = new Web3(process.env.GANACHE_NETWORK);

router.post('/', async (req, res) => {
    const {from, to, amount} = req.body;
    console.log('from: ', from);
    console.log('to:', to);
    console.log('amount: ', amount);

    const myErc20Contract = await new web3.eth.Contract(erc20abi, process.env.CONTRACT_ADDR, {
        from: process.env.SERVER_ADDR // server Addr
    }); 

    const server = await web3.eth.accounts.wallet.add('70de36ef2a8437824c0999c10c07cfb26cc38292e17868a33867effa9b627c2d');

    // (1) 토큰 보내기 전에 잔액 확인
    var from_bal = await myErc20Contract.methods.balanceOf(from).call();
    var to_bal = await myErc20Contract.methods.balanceOf(to).call();

    console.log('from bal: ', from_bal);
    console.log('to_bal: ', to_bal);

    if(Number(amount) > Number(from_bal)) {
        res.status(400).json('Insufficient Token'); // 잔액 부족
    }
    
    // (2) transfer 함수 실행
    await myErc20Contract.methods.transfer(to, amount).send(
        {from: from, gasPrice: 100, gas: 100000},
        function(err, txhash){
            try{
                console.log(txhash);
                //여기서 나온 txhash 로 블록 조회 하고
                //조회가 끝나면 잔액 체크 해주고
                //바뀐 잔액을 DB로 업데이트 해준다. 

            }catch(err){
                console.log("Error " + err.toString());
            }
        }
    )

})

module.exports = router;