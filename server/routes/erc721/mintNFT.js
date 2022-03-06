require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(process.env.GANACHE_NETWORK);
const express = require('express');
const router = express.Router();
const { Nft } = require('../../models')
const { create } = require('ipfs-http-client');
const { fromString } = require('uint8arrays/from-string');

const execSync = require('child_process').execSync;
const erc721abi = require('../../contracts/erc721abi');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
});

    // upload 버튼 클릭 시, cid 값을 얻기 위한 함수
function get_cid(nfturl){
    const cid = execSync(`ipfs add ${nfturl}`).toString().replace(/\n/g, "")

    return cid
}

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

    const {username, nfturl, nftname, nftdesc} = req.body;

    const myErc721Contract = await new web3.eth.Contract(erc721abi, process.env.ERC721_CONTRACT_ADDR);
    
    let name  = await myErc721Contract.methods.name().call();
    let symbol = await myErc721Contract.methods.symbol().call();

    console.log(name,symbol)

    const ipfsLink = await get_cid_withIpfs(nfturl);

    res.send('OK');
})

module.exports = router;