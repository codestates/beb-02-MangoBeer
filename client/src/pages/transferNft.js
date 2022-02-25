// NFT 거래 페이지
import { Button } from 'react-bootstrap';
import NftList from '../components/nftList';
import {useState, useEffect} from 'react';

function TransferNft(username,address) {
    const [nftList, setNftList] = useState([]); // nft List

    useEffect(() => {
      // NFT list 불러오는 API 호출 ...
      setNftList([{nftSrc: "images/nft1.jpeg", nftName: "nft Name", nftPrice: "nft Price", nftId: 1}]);
    }, [])

    const mintBntHandler = () => {
      document.location.href = '/mintNft';
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

        <div style={{marginLeft: "17%", marginRight: "17%", marginTop: "100px"}}>
          {
            nftList.length == 0?
            ''
            :
            nftList.map((dataInfo) => {
                return <NftList key={dataInfo.nftId} dataInfo={dataInfo} />
            })
          }

        </div>

      </div>
    );
  }
  
  export default TransferNft;
  