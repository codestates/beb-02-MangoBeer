import { Button, Form, Row, Col , Image} from 'react-bootstrap';

function NftList({dataInfo}) {
    return(
        <div 
            style={{width: "30%", margin:"1%", float:"left", padding: "20px 15px", border: "1px solid lightgray", borderRadius:"20px"}}  
          >
            <Row className="mb-3">
              <Image
                src={dataInfo.nftSrc}
              >

              </Image>
            </Row>

            <Row>

              <Form.Group as={Col} controlId="formGridCity" style={{flex: "2"}}>  
                <Row style={{marginLeft: "10px"}}>
                  {dataInfo.nftName}
                </Row>
                <Row style={{marginLeft: "10px"}}>
                  {dataInfo.nftPrice}
                </Row>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity" style={{flex: "1"}}>
                <Button
                  variant="light" 
                >
                  구매
                </Button>
              </Form.Group>

            </Row>
          </div>

    )
}

export default NftList;