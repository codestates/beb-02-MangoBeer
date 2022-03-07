// NFT 생성 페이지 - mintNft
import React, {useState} from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from "react-router";
import axios from 'axios';

function CreateNFT({username,address}) {
  
    const [selectedFileURL, setSelectedFileURL] = useState(); // 선택된 파일 URL(미리보기용)
    const [selectedFileImg, setSelectedFileImg] = useState();

    const [nftName, setNftName] = useState(''); // 입력한 nft 이름
    const [nftDesc, setNftDesc] = useState(''); // 입력한 nft 설명

    const navigate = useNavigate();

    const selectImgForNFT = (event) => {
      const file = event.target.files[0];
      
      setSelectedFileImg(file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setSelectedFileURL(reader.result);
      }
  }

    const mintNFTBtnHandler = () => {
      if(window.confirm("새로운 NFT를 발행하시겠습니까?")){
        console.log('NFT 발행 중 ...')
        // NFT 발행 API
        axios.post('http://localhost:4000/mintNFT', {
          username: username, // server만 deploy 가능하다는 전제
          useraddr: address,
          nfturl: selectedFileURL,
          nftname: nftName,
          nftdesc: nftDesc
        })
        .then(res => res.data)
        .then(async (data) => {
          alert('NFT가 발행되었습니다.');
          navigate('/nft');
        })
        .catch(err => {
          console.log(err);
          alert('NFT 발행에 실패하였습니다.');
          alert(err.toString());
        });;

        // NFT 발행 시 -> 페이지 이동
        // document.location.href = '/nft';
      }
    }

    return (
      <div className="CreateNFT">
        <h2 style={{margin: "50px", textAlign: "center"}}>Mint New NFT</h2>

      
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          
          <div className='selectNFTFile' style={{marginBottom: "40px"}}>
              <label for="selectFile">
                {selectedFileURL?
                  <img src={selectedFileURL} style={{width: '400px'}} />
                  :
                  <img src="images/Upload.png" style={{width: '35%', height: '35%'}} />
                }
              </label>
              <br></br>
              <input id='selectFile' type="file" name="file" onChange={selectImgForNFT} style={{visibility: 'hidden'}}/>

          </div>

          <InputGroup className="mb-3" style={{width: "40%"}}>
            <InputGroup.Text id="nftName">NFT 이름</InputGroup.Text>
            <FormControl
              placeholder="NFT 이름"
              value={nftName}
              onChange={(e) => {
                setNftName(e.target.value);
                console.log(nftName);
              }}
            />
          </InputGroup>

          <InputGroup  style={{width: "40%"}}>
            <InputGroup.Text id="descNft">NFT 설명</InputGroup.Text>
            <FormControl 
              as="textarea" 
              style={{height: "200px", resize: "none"}}
              value={nftDesc}
              onChange={(e) => {
                setNftDesc(e.target.value);
                console.log(nftDesc);
              }}
            />
          </InputGroup>

        </div>


          <Button 
            size='lg'
            variant="light" 
            style={{margin: "50px"}}
            onClick={mintNFTBtnHandler}
          >
          NFT 발행하기
          </Button>
      </div>
    );
  }
  
  export default CreateNFT;
  