require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(process.env.GANACHE_NETWORK);
const express = require('express');
const router = express.Router();
const { Nft } = require('../../models')

const execSync = require('child_process').execSync;
const erc721abi = require('../../contracts/erc721abi');

router.post('/', async(req, res, next) => {

    console.log(req.body); 
    // let img_path = req.body.nftpath 
    // let img_name = req.body.nftname

    const myErc721Contract = await new web3.eth.Contract(erc721abi, process.env.ERC721_CONTRACT_ADDR);
    console.log(process.env.SERVER_ADDR) // server address
    
    let name  = await myErc721Contract.methods.name().call();
    let symbol = await myErc721Contract.methods.symbol().call();

    console.log(name,symbol)

    // upload 버튼 클릭 시, cid 값을 얻기 위한 함수
// function get_cid(){
//     const cid = execSync(`ipfs add --quieter --pin=false${img_path}`).toString().replace(/\n/g, "")

//     // !!! 중요 !!!!
//     // ipfs local에 한번이라도 올라간 파일이라면 retun 하지 말아야함, 나중에 if 넣어주면 아주 좋을것같다
//     // 우선, ipfs files rm -rf "${img_name}" 명령어로 수동으로 지워주면서 실행해야하는듯?
//     // 올라간 파일이 뭐가 있는지 확인하고 싶다면 `ipfs files ls` 

//     // execSync(`ipfs files cp /ipfs/${cid}` + ` "` + `${img_name}` + `"`)

//     return cid
// }

// let cid = get_cid();
// let url = "https://ipfs.io/ipfs/" + cid
// console.log(url)



    // await myErc721Contract.methods.mintNFT(recipient, tokenURI).send(
    //     {from: server.address,}
    // )
    // .on('receipt', (receipt) => {
    //     const msg = 'Succeed in minting new ERC721 Token.';
    //     res.status(201).json({receipt, msg});
    // })
    // .on('error', (error) => {
    //     error = error.toString();
    //     const msg = 'Failed to mint new ERC721 Token.';
    //     res.status(500).send({error, msg});
    // });

    //console.log()

    //     Nft.create({
//         username: req.body.username,
//         nftpath: req.body.nftpath,
//         nftname: req.body.nftname,
//         nftdesc: req.body.nftdesc,
//         nftprice: req.body.nftprice, // 가격 부분은 아직...
//     }).then((result) => {
//         console.log('success!');
//     })


})

module.exports = router;