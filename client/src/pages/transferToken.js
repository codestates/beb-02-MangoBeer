// 토큰 거래 페이지 
import {FormControl, InputGroup, Button, Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import TxList from '../components/txList';
function TransferToken({username,address}) {

  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [txList, setTxList] = useState([]); // Tx 리스트


  useEffect(() => {
    // Tx list 불러오는 API 호출 ...
    setTxList([{from: '0x111111111111', to: '0x222222222222222', amount: '3', txhash: '0x33333333333'}])
  }, [])
  
  const transferBntHandler = () => {
    if(window.confirm("토큰을 전송하시겠습니까?")){
      console.log('토큰 전송 중 ...')
      // ERC20 토큰 전송 API...
      setAmount('');
      setReceiver('');
    }
  }

    return (
      <div className="TransferToken">
        <div>
          <h2 style={{marginTop: "50px", marginLeft: "17%", textAlign: "left"}}>Token</h2>
          <span style={{marginTop: "10px", marginLeft: "17%", float: "left"}}>보유한 토큰을 다른 유저들과 거래해보세요!</span>
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
  