import { Button, Form, Row, Col , Image, FormControl} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';

function MyNftList({dataInfo}) {
    const [price, setPrice] = useState('');
    const [nftData, setNftData] = useState(dataInfo);


    const registerBntHandler = () => {
        axios.post('http://localhost:4000/forNFT/registerNFT', {
            tokenId: nftData.id,
            price: price
          })
          .then(res => res.data)
          .then(async (data) => {
            alert('판매 등록하였습니다.');
            setPrice('');
            setNftData(data.NFT);
          })
          .catch(err => {
            console.log(err);
            alert('판매 등록에 실패하였습니다.');
            alert(err.toString());
          });

    }

    const cancleBntHandler = () => {
        axios.post('http://localhost:4000/forNFT/cancleNFT', {
            tokenId: nftData.id
          })
          .then(res => res.data)
          .then(async (data) => {
            alert('판매 취소하였습니다.');
            setNftData(data.NFT);
          })
          .catch(err => {
            console.log(err);
            alert('판매 취소에 실패하였습니다.');
            alert(err.toString());
          });
    }
    
    return(
        <div 
            style={{width: "30%", height: "350px", margin:"1%", float:"left", padding: "20px 15px", border: "1px solid lightgray", borderRadius:"20px"}}  
          >
            <Row className="mb-3">
              <Image style={{height: "230px"}}
                src={nftData.nftpath}
              >

              </Image>
            </Row>

            <Row>

              <Form.Group as={Col} controlId="formGridCity" style={{flex: "2"}}>  
                <Row style={{marginLeft: "10px"}}>
                  {nftData.nftname}
                </Row>
                {
                nftData.sellingflag == 0 ?
                <FormControl
                placeholder="NFT Price"
                value={price}
                onChange={(e)=>{
                  setPrice(e.target.value);
                  console.log(price);
                }}
              />
                :
                <Row style={{marginLeft: "10px"}}>
                  {nftData.nftprice} Mango🥭
                </Row>
                }
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity" style={{flex: "1"}}>
                {
                nftData.sellingflag == 0 ?
                <Button
                  variant="light" 
                  onClick={registerBntHandler}
                >
                  판매 등록
                </Button>
                :
                <Button
                  variant="light" 
                  onClick={cancleBntHandler}
                >
                  판매 취소
                </Button>
                }
              </Form.Group>

            </Row>
          </div>

    )
}

export default MyNftList;