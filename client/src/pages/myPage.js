// 마이페이지
/* global BigInt */

import { Table } from 'react-bootstrap';
import BoardList from '../components/boardList';
import {useState, useEffect} from 'react'
import NftList from '../components/nftList';
import TxList from '../components/txList';
import axios from 'axios';

function MyPage({username,address}) {

    const [myPostDataList, setMyPostDataList] = useState([]);
    const [myTxList, setMyTxList] = useState([{from: '0x111111111111', to: '0x222222222222222', amount: '3', txhash: '0x33333333333'}]);
    const [myNftList, setMyNftList] = useState([{nftSrc: "images/nft1.jpeg", nftName: "nft Name", nftPrice: "nft Price", nftId: 1}]);
    const [myTokenBal, setMyTokenBal] = useState();

    const [count, setCount] = useState(0);

    useEffect(()=>{
      setTimeout(() => { setCount(count + 1) }, 10000); // 10s

      getTokenBal();
      getPosts();
    }, [count])

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

    const getPosts = () => {
      axios.get('http://localhost:4000/mypage/getPosts', {
        params: {
          user_name: username
        }
      })
      .then(res => {
        // console.log(res);
        return res.data;
      })
      .then(data => {
        setMyPostDataList(data);
      }) 
      .catch(err => {
        console.log(err); 
        alert(err.toString());
      });
    }

    return (
      <div className="MyPage">

        <h2 style={{marginTop: "50px", marginLeft: "17%", textAlign: "left"}}>MyPage</h2>
        
        <div style={{marginLeft: "18%", marginRight: "18%", marginTop: "30px"}}>
          <table style={{textAlign: "left"}}>
            <tr>
              <th style={{width: "500px", fontSize: "23px"}}>{username}</th>
              <th rowSpan={2} style={{width: "400px", fontSize: "27px"}}>{myTokenBal} <span style={{color: "orange"}}>Mango 🥭</span></th>
            </tr>
            <tr>
              <td style={{fontSize: "18px", color: "gray"}}>{address}</td>
            </tr>
          </table>
        </div>

        <div style={{margin: "3% 18%"}}>
          <h5 style={{textAlign: "left", marginBottom: "25px"}}>✔︎ 내가 쓴 글 목록</h5>
          <Table bordered hover>
            <thead>
              <tr>
                <th style={{width: "5%"}}>No.</th>
                <th style={{width: "60%"}}>제목</th>
                <th>작성자</th>
                <th>작성 일시</th>
              </tr>
            </thead>
            <tbody>
            {
              myPostDataList.length == 0?
              ''
              :
              myPostDataList.map((dataInfo) => {
                return <BoardList key={dataInfo.id} dataInfo={dataInfo} />
              })
            }
          </tbody>
          </Table>
        </div>

        <div style={{margin: "3% 18%"}}>
          <h5 style={{textAlign: "left", marginBottom: "25px"}}>✔︎ 내 토큰 전송 기록</h5>
          <Table bordered >
            <thead>
              <tr>
                <th>From Addr</th>
                <th>To Addr</th>
                <th>Amount</th>
                <th>Tx Hash</th>
              </tr>
            </thead>
            <tbody>
            {
              myTxList.length == 0?
              ''
              :
              myTxList.map((dataInfo) => {
                return <TxList key={dataInfo.id} dataInfo={dataInfo} />
              })
            }
          </tbody>
          </Table>
        </div>

        <div style={{margin: "3% 18%"}}>
          <h5 style={{textAlign: "left", marginBottom: "25px"}}>✔︎ 내가 보유한 NFT</h5>
          <div>
          {
            myNftList.length == 0?
            ''
            :
            myNftList.map((dataInfo) => {
                return <NftList key={dataInfo.nftId} dataInfo={dataInfo} />
            })
          }

        </div>
        </div>
      </div>
    );
  }
  
  export default MyPage;
  