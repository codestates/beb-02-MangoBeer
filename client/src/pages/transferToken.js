// 토큰 거래 페이지 
/* global BigInt */

import {FormControl, InputGroup, Button, Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import TxList from '../components/txList';
import axios from 'axios';
function TransferToken({username,address}) {

  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [txList, setTxList] = useState([]); // Tx 리스트
  const [myTokenBal, setMyTokenBal] = useState(); // 내 토큰 개수

  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => { setCount(count + 1) }, 10000); // 10s

    getTokenBal(); // token 잔액 불러오기
    getTxList();
  }, [count])
  
  const transferBntHandler = () => {
    if(window.confirm("토큰을 전송하시겠습니까?")){
      console.log('토큰 전송 중 ...')

      var am = BigInt(amount);
      am *= 1000000000000000000n
      am = String(am);

      console.log(address, amount, receiver);

      axios.post('http://localhost:4000/transferEach', {
        to: receiver,
        from: address,
        amount: am
      })
      .then(res => {
        if(res.status == 201) {
          alert('토큰 전송에 성공하였습니다.');
          setAmount('');
          setReceiver('');
          getTokenBal();
        }
        else {
          alert('토큰 전송에 실패하였습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('토큰 전송에 실패하였습니다.');
        alert(err.toString());
      })
    }
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

  const getTxList = () => {
    setTxList([{from: '0x111111111111', to: '0x222222222222222', amount: '3', txhash: '0x33333333333'}]);
  }

    return (
      <div className="TransferToken">

        <h2 style={{marginTop: "50px", marginLeft: "17%", textAlign: "left"}}>Token</h2>
        <div style={{marginTop: "10px", marginLeft: "17%", float: "left"}}>보유한 토큰을 다른 유저들과 거래해보세요!</div>

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

        <div style={{marginTop: "80px", marginLeft: "17%", marginRight: "17%"}}>
        <InputGroup className="mb-3">
          <InputGroup.Text>수신자</InputGroup.Text>
          <FormControl 
            value={receiver}
            onChange={(e) => {
              setReceiver(e.target.value);
              // console.log(receiver);
            }}
          />
          <InputGroup.Text>수량</InputGroup.Text>
          <FormControl 
            value={amount}
            onChange={(e)=> {
              setAmount(e.target.value);
              // console.log(amount);
            }}
          />

          <Button 
            variant="outline-secondary" 
            id="button-addon2"
            onClick={transferBntHandler}
          >
            토큰 전송하기
          </Button>
        </InputGroup>
        </div>

        <div style={{marginTop: "100px", marginLeft: "17%", marginRight: "17%"}}>
          <h3 style={{textAlign: 'left'}}>Token Tx List</h3>

          <Table style={{marginTop: "30px"}}>
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
              txList.length == 0?
              ''
              :
              txList.map((dataInfo) => {
                return <TxList key={dataInfo.id} dataInfo={dataInfo} />
              })
            }
          </tbody>
          </Table>
        </div>
      </div>
    );
  }
  
  export default TransferToken;
  