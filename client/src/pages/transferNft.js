// NFT 거래 페이지
import {Button } from 'react-bootstrap';

function TransferNft() {
    const mintBntHandler = () => {
      document.location.href = '/mintNft';
    }

    return (
      <div className="TransferNft">
        <h2 style={{marginTop: "50px", marginLeft: "17%", textAlign: "left"}}>NFT</h2>

        <div>
          <span style={{marginTop: "10px", marginLeft: "17%", float: "left"}}>보유한 토큰으로 NFT를 거래해보세요!</span>
          <Button 
            style={{marginRight: "17%", float: "right"}}
            variant="light" 
            onClick={mintBntHandler}
          >
            NFT 발행하기
          </Button>
        </div>

      </div>
    );
  }
  
  export default TransferNft;
  