import { Button, Form, Row, Col , Image} from 'react-bootstrap';
import axios from 'axios';

function NftList({dataInfo, address}) {

    const transferBntHandler = () => {
      if(window.confirm('NFT를 구매하시겠습니까?')){
        console.log('NFT 구매 중...');

        axios.post('http://localhost:4000/transferNFT', {
          to: address,
          from: dataInfo.useraddr,
          tokenId: dataInfo.id
        })
        .then(res => {
          if(res.status == 201) {
            alert('NFT 구매에 성공하였습니다.');
          }
          else {
            alert('NFT 구매에 실패하였습니다.');
          }
        })
        .catch((err) => {
          console.log(err);
          alert('NFT 구매에 실패하였습니다.');
          alert(err.toString());
        });
        
      }
    };

    return(
        <div 
            style={{width: "30%", height: "360px", margin:"1%", float:"left", padding: "20px 15px", border: "1px solid lightgray", borderRadius:"20px"}}  
          >
            <Row className="mb-3">
              <Image style={{height: "230px"}}
                src={dataInfo.nftpath}
              >

              </Image>
            </Row>

            <Row>

              <Form.Group as={Col} controlId="formGridCity" style={{flex: "2"}}>  
                <Row style={{marginLeft: "10px"}}>
                  {dataInfo.nftname}
                </Row>
                <Row style={{marginLeft: "10px"}}>
                  {dataInfo.nftprice} Mango🥭
                </Row>
                <Row style={{marginLeft: "10px", color: "gray"}}>
                  (Own By {dataInfo.username})
                </Row>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity" style={{flex: "1"}}>
                <Button
                  variant="light" 
                  onClick={transferBntHandler}
                >
                  구매
                </Button>
              </Form.Group>

            </Row>
          </div>

    )
}

export default NftList;