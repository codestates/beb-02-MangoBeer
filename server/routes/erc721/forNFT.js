require('dotenv').config();
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { Nft } = require('../../models')

const web3 = new Web3(process.env.GANACHE_NETWORK);

const erc721abi = require('../../contracts/erc721_1abi');

// erc721 토큰 보유 개수 가져오기.
router.get('/getBalance', async (req, res) => {
    const {account} = req.query;

    const myErc721Contract = await new web3.eth.Contract(erc721abi, process.env.ERC721_CONTRACT_ADDR, {
        from: process.env.SERVER_ADDR
    });

    var balance; 
    var msg;

    try{
        balance = await myErc721Contract.methods.balanceOf(account).call();
        msg = 'Succeed in getting ERC721 balance of user.';
    
        res.status(200).json({balance, msg});
    }
    catch(error) {
        msg = 'Failed to get supply of ERC721 Token';
        error = error.toString();
        res.status(500).json({error, msg});
    }

});

router.post('/setToken', async (req, res) => {
    const myErc721Contract = await new web3.eth.Contract(erc721abi, process.env.ERC721_CONTRACT_ADDR, {
        from: process.env.SERVER_ADDR
    });

    const server = await web3.eth.accounts.wallet.add(process.env.SERVER_PK);

    try{
        var flag = await myErc721Contract.methods.setToken(process.env.CONTRACT_ADDR).send(
            {from: server.address, to: process.env.CONTRACT_ADDR, gasPrice: 100, gas: 2000000},
        );
        msg = 'Succeed in setting ERC20 Token To ERC721 Contract.';
    
        res.status(201).json({flag, msg});
    }
    catch(error) {
        msg = 'Failed to set ERC20 Token To ERC721 Contract';
        error = error.toString();
        res.status(500).json({error, msg});
    }


})

router.post('/registerNFT', async(req, res)=> {
    const {tokenId, price} = req.body;

    const NFT = await Nft.findOne({
        where: {id: tokenId}
    })

    // console.log(NFT);

    await NFT.update({ sellingflag: true, nftprice: Number(price)});
    await NFT.save();

    res.status(201).json({NFT});

})

router.post('/cancleNFT', async(req, res) => {
    const {tokenId} = req.body;

    const NFT = await Nft.findOne({
        where: {id: tokenId}
    })

    await NFT.update({ sellingflag: false});
    await NFT.save();

    res.status(201).json({NFT});
})

router.get('/ownerOf', async(req, res) => {
    const {tokenId} = req.query;

    const myErc721Contract = await new web3.eth.Contract(erc721abi, process.env.ERC721_CONTRACT_ADDR, {
        from: process.env.SERVER_ADDR
    });

    const owner = await myErc721Contract.methods.ownerOf(tokenId).call();

    res.status(200).json({owner});
})

module.exports = router;