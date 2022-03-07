require('dotenv').config();
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const { Nft } = require('../../models')
const sequelize = require("sequelize");
const Op = sequelize.Op;

const web3 = new Web3(process.env.GANACHE_NETWORK);

const erc721abi = require('../../contracts/erc721_1abi');

router.get('/', async (req, res) => {
    const {address} = req.query; // 주인 address

   try{
        const nftList = await Nft.findAll({
            where: {useraddr: address}
        });

        const msg = "succeed in getting users NFT List";
        res.status(200).json({nftList, msg});
    }
    catch(err) {
        const msg = "failed to get users NFT List";
        res.status(400).json({msg});
    }

})

router.get('/isSelling', async (req, res) => {
   const {address} = req.query; 

    try{
        const nftList = await Nft.findAll({
            where: {
                sellingflag: true,
                useraddr: {
                    [Op.not] : address
                }
            }
            
        });
        const msg = "succeed in getting selling NFT List";
        res.status(200).json({nftList, msg});
    }
    catch(err) {
        const msg = "failed to get selling NFT List";
        res.status(400).json({msg});
    }

})

module.exports = router;