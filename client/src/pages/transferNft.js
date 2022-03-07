// NFT 거래 페이지
/* global BigInt */

import { Button } from 'react-bootstrap';
import NftList from '../components/nftList';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';

function TransferNft({username,address}) {

    const [myTokenBal, setMyTokenBal] = useState(); // 내 토큰 개수
    const [nftList, setNftList] = useState([]); // nft List
    const [count, setCount] = useState(0);
    
    const navigate = useNavigate();

    useEffect(() => {
      setTimeout(() => { setCount(count + 1) }, 1000); // 10s
      getTokenBal(); // token 잔액 불러오기
      // NFT list 불러오는 API 호출 ...
      getNftList();
    }, [count])

    const getNftList = () => {
      console.log('hmm..', address);
      axios.get('http://localhost:4000/getNFT/isSelling',{    
        params: {
          address: address
        }
      }) 
      .then(res => res.data)
      .then(data => {
        setNftList(data.nftList);
      })
      .catch(err => console.log(err));
    }

    const getTokenBal = () => {
      axios.get('http://localhost:4000/forEther/totalSupply', {
        params: {
          account: address
        }
      })
      .then(res => {
        // console.log(res);
        if(res.status === 200){
          var balance = BigInt(res.data.totalSupply);
          balance /= 1000000000000000000n
          balance = String(balance);
          setMyTokenBal(balance); 
        }
        else {
          setMyTokenBal('-');
        }
      }) 
      .catch(err => {
        console.log(err); 
        alert(err.toString());
        setMyTokenBal('-');
      });
    }

    const mintBntHandler = () => {
      navigate('/mintNft')
    }

    return (
      <div className="TransferNft">
        <div>
          <h2 style={{marginTop: "50px", marginLeft: "17%", textAlign: "left"}}>NFT</h2>

          <span style={{marginTop: "10px", marginLeft: "17%", float: "left"}}>보유한 토큰으로 NFT를 거래해보세요!</span>
          <Button 
            style={{marginRight: "17%", float: "right"}}
            variant="light" 
            onClick={mintBntHandler}
          >
            NFT 발행하기
          </Button>

        </div>

        <div style={{marginLeft: "17%", marginRight: "17%", marginTop: "70px", backgroundColor: "#FFF8DC"}}>
          <table style={{textAlign: "left", margin: "20px"}}>
            <tr>
              <th style={{width: "500px", fontSize: "23px"}}>{username}</th>
              <th rowSpan={2} style={{width: "400px", fontSize: "27px"}}>{myTokenBal} <span style={{color: "orange"}}>Mango 🥭</span></th>
            </tr>
            <tr>
              <td style={{fontSize: "18px", color: "gray"}}>{address}</td>
            </tr>
          </table>
        </div>

        <div style={{marginLeft: "17%", marginRight: "17%", marginTop: "100px"}}>
          {
            nftList.length == 0?
            ''
            :
            nftList.map((dataInfo) => {
                return <NftList key={dataInfo.nftId} dataInfo={dataInfo} address={address} />
            })
          }

        </div>

      </div>
    );
  }
  
  export default TransferNft;
  