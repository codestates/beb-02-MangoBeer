require('dotenv').config();
const Web3 = require('web3');
const express = require('express');
const router = express.Router();
const { Nft } = require('../../models')
const { create } = require('ipfs-http-client');
const { fromString } = require('uint8arrays/from-string');

const web3 = new Web3(process.env.GANACHE_NETWORK);
const execSync = require('child_process').execSync;

const erc721abi = require('../../contracts/erc721_1abi');
const erc20abi = require('../../contracts/erc20abi');


const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
});

async function get_cid_withIpfs(nfturl){

    var matches =nfturl.match(/^data:.+\/(.+);base64,(.*)$/);
    var ext = matches[1];
    var base64_data = matches[2];
    const data = fromString(base64_data, 'base64');


    const {cid} = await client.add(data);
    const ipfsLink = "https://ipfs.io/ipfs/" +cid;
    console.log(ipfsLink);

    return ipfsLink;
}

router.post('/', async(req, res, next) => {

    const {username, useraddr, nfturl, nftname, nftdesc} = req.body;
    console.log(username, useraddr, nftname, nftdesc);

    const myErc721Contract = await new web3.eth.Contract(erc721abi, process.env.ERC721_CONTRACT_ADDR);
    const myErc20Contract = await new web3.eth.Contract(erc20abi, process.env.CONTRACT_ADDR, {
        from: process.env.SERVER_ADDR // server Addr
    }); 
    
    let name  = await myErc721Contract.methods.name().call();
    let symbol = await myErc721Contract.methods.symbol().call();

    console.log(name,symbol)

    const ipfsLink = await get_cid_withIpfs(nfturl);

    const server = await web3.eth.accounts.wallet.add(process.env.SERVER_PK);

    // 먼저, 1. 잔액 확인
    var addr_bal = await myErc20Contract.methods.allowance(useraddr, server.address).call();

    console.log('addr bal: ', addr_bal);

    if(2e18 > Number(addr_bal)) {
        return res.status(400).send('Insufficient ERC20 Mango Token'); // 잔액 부족
    }

    // 2. 토큰 차감
    const resultOfERC20 = await myErc20Contract.methods.transferEach(useraddr, server.address, "2000000000000000000").send(
        {from: server.address, to: process.env.CONTRACT_ADDR, gasPrice: 100, gas: 2000000}
    )
    .on('error', (error) => {
        error = error.toString();
        const msg = 'Failed to transfer ERC20 Token between users.';
        res.status(400).send({error, msg});
    })

    console.log('망고 차감 Tx: ', resultOfERC20.transactionHash);

    // 3. NFT 발행
    const resultOfERC721 = await myErc721Contract.methods.mintNFT(useraddr, ipfsLink).send(
        {from: server.address, to: process.env.ERC721_CONTRACT_ADDR, gasPrice: 100, gas: 2000000},
    )
    .on('error', (error) => {
        error = error.toString();
        const msg = 'Failed to mint new ERC721 Token.';
        //res.status(500).send({error, msg});
    });

    console.log('NFT 민팅 Tx: ', resultOfERC721);

    const recordedNft = await Nft.create({
        username: username,
        nftpath: ipfsLink,
        nftname: nftname,
        nftdesc: nftdesc,
        nftprice: 0, // 가격 부분은 아직...
        useraddr: useraddr,
        sellingflag: false
    });

    const msg = 'Succeed in minting new ERC721 Token.';

    res.status(201).json({resultOfERC20, resultOfERC721, recordedNft, msg});
})

module.exports = router;