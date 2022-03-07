// 마이페이지
/* global BigInt */

import { Button } from 'react-bootstrap';
import {useState, useEffect} from 'react'
import axios from 'axios';


function ServerPage({username,address}) {

    const [myTokenBal, setMyTokenBal] = useState();
    const [myEthBal, setMyEthBal] = useState();
    const [myContractAddr, setMyContractAddr] = useState('-'); // 컨트랙트 주소
    const [myContractDate, setMyContractDate] = useState('-')
    const [isDeploy, setIsDeploy] = useState(false);

    const [myNftContractAddr, setMyNftContractAddr] = useState('-'); // NFT 컨트랙트 정보
    const [myNftContractDate, setMyNftContractDate] = useState('-')
    const [isNftDeploy, setIsNftDeploy] = useState(false);

    const [count, setCount] = useState(0);

    useEffect(()=>{
      setTimeout(() => { setCount(count + 1) }, 10000); // 10s

      getTokenBal();
      getEthBal();
      getContractInfo();
      getNftContractInfo();
    }, [count])

    const getContractInfo = () => {
      axios.get('http://localhost:4000/mypage/getLatestContracts')
      .then(res => {
        // console.log(res);
        if(res.status === 200){
          setMyContractAddr(res.data.latestInfo.contractAddr);
          setMyContractDate(res.data.latestInfo.create_at);
          setIsDeploy(true);
        }
      }) 
      .catch(err => {
        console.log(err); 
        alert('ERC20 컨트랙트 배포가 필요합니다.');
        setMyContractAddr('-');
        setMyContractDate('-');
        setIsDeploy(false);
      });
    }

    const getNftContractInfo = () => {
      axios.get('http://localhost:4000/mypage/getLatestNFTContracts')
      .then(res => {
        // console.log(res);
        if(res.status === 200){
          setMyNftContractAddr(res.data.latestInfo.contractAddr);
          setMyNftContractDate(res.data.latestInfo.create_at)
          setIsNftDeploy(true);
        }
      }) 
      .catch(err => {
        console.log(err); 
        alert('ERC721 컨트랙트 배포가 필요합니다.');
        setMyNftContractAddr('-');
        setMyNftContractDate('-');
        setIsNftDeploy(false);
      });
    }
    
    const getTokenBal = () => {
      axios.get('http://localhost:4000/forEther/totalSupply')
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

    const getEthBal = () => {
        axios.get('http://localhost:4000/forEther/serverEthBalance')
        .then(res => {
          // console.log(res);
          if(res.status === 200){
            setMyEthBal(res.data.balance); 
          }
          else {
            setMyEthBal('-');
          }
        }) 
        .catch(err => {
          console.log(err);
          alert(err.toString()); 
          setMyEthBal('-');
        });
    }

    const FaucetBntHandler = () => {
        axios.post('http://localhost:4000/ethFaucet')
        .then(res => {
          // console.log(res);
          if(res.status === 201){
            getEthBal();
          }
          else {
            setMyEthBal('-');
          }
        }) 
        .catch(err => {
          console.log(err); 
          alert(err.toString());
          setMyEthBal('-');
        });
    }

    const deployBntHandler = () => {
      if(isDeploy == false) {
        axios.post('http://localhost:4000/deployContract')
        .then(res => {
          // console.log(res);
          if(res.status === 201){
            getContractInfo();
          }
          else {
            alert('ERC20 토큰 컨트랙트 배포에 실패하였습니다.');
          }
        }) 
        .catch(err => {
          console.log(err); 
          alert('ERC20 토큰 컨트랙트 배포에 실패하였습니다.');
          alert(err.toString());
        });
      }
      else {
        alert('이미 컨트랙트를 배포하였습니다.');
      }

    }

    const deployNFTBntHandler = () => {
      if(isNftDeploy == false) {
        axios.post('http://localhost:4000/deployNFT')
        .then(res => {
          // console.log(res);
          if(res.status === 201){
            getNftContractInfo();
          }
          else {
            alert('ERC721 토큰 컨트랙트 배포에 실패하였습니다.');
          }
        }) 
        .catch(err => {
          console.log(err); 
          alert('ERC721 토큰 컨트랙트 배포에 실패하였습니다.');
          alert(err.toString());
        });
      }
      else {
        alert('이미 ERC721 컨트랙트를 배포하였습니다.');
      }
    }

    const setBntHandler = () => {
      axios.post('http://localhost:4000/forNFT/setToken')
      .then(res => {
        if(res.status === 201){
          alert('ERC20 토큰 컨트랙트 세팅에 성공하였습니다.');
        }
        else {
          alert('ERC20 토큰 컨트랙트 세팅에 실패하였습니다.');
        }
      })
      .catch(err => {
        console.log(err); 
        alert('ERC20 토큰 컨트랙트 세팅에 실패하였습니다.');
        alert(err.toString());
      });
    }

    return (
      <div className="MyPage">

        <h2 style={{marginTop: "50px", marginLeft: "17%", textAlign: "left"}}>Server Admin Page</h2>
        
        <div style={{marginLeft: "18%", marginRight: "18%", marginTop: "30px"}}>
          <table style={{textAlign: "left"}}>
            <tr>
              <th style={{width: "500px", fontSize: "24px"}}>{username}</th>
            </tr>
            <tr>
              <td style={{fontSize: "18px", color: "gray"}}>{address}</td>
            </tr>
          </table>
        </div>

        <div style={{marginLeft: "18%", marginRight: "18%", marginTop: "40px"}}>
          <table style={{textAlign: "left"}}>
            <tr>
              <th style={{ fontWeight: "normal", fontSize: "22px"}}>Total Supply</th>
              <th style={{ fontWeight: "normal", fontSize: "22px"}}>Total Balance</th>
            </tr>
            <tr> 
              <td rowSpan={2} style={{width: "400px", fontSize: "27px", fontWeight: "bold"}}>{myTokenBal} <span style={{color: "orange"}}>Mango 🥭</span></td>
              <td rowSpan={2} style={{width: "400px", fontSize: "27px", fontWeight: "bold"}}>{myEthBal} <span style={{color: "black"}}>ETH 🪙</span></td>
              <td style={{textAlign: "center"}}>        
                <Button 
                    variant="light" 
                    style={{margin: "4px"}}
                    onClick={FaucetBntHandler}
                    >
                    1ETH 받기
                </Button>
              </td>
            </tr>
          </table>
        </div>

        <div style={{marginLeft: "18%", marginRight: "18%", marginTop: "40px"}}>
          <table style={{textAlign: "left"}}>
            <tr>
              <th style={{ fontWeight: "normal", fontSize: "22px"}}>ERC20 Token Contract Info</th>
            </tr>
            <tr> 
              <td style={{fontSize: "27px", fontWeight: "bold"}}>{myContractAddr}</td>
              <td style={{textAlign: "center"}}>        
                <Button 
                    variant="light" 
                    style={{margin: "4px"}}
                    onClick={deployBntHandler}
                    >
                    컨트랙트 배포하기
                </Button>
              </td>
            </tr>
            <tr>
              <td style={{fontSize: "18px", color: "gray"}}>{myContractDate}</td>
            </tr>
          </table>
        </div>

        <div style={{marginLeft: "18%", marginRight: "18%", marginTop: "40px"}}>
          <table style={{textAlign: "left"}}>
            <tr>
              <th style={{ fontWeight: "normal", fontSize: "22px"}}>ERC721 Token Contract Info</th>
            </tr>
            <tr> 
              <td style={{fontSize: "27px", fontWeight: "bold"}}>{myNftContractAddr}</td>
              <td style={{textAlign: "center"}}>        
                <Button 
                    variant="light" 
                    style={{margin: "4px"}}
                    onClick={deployNFTBntHandler}
                    >
                    컨트랙트 배포하기
                </Button>
              </td>
              <td style={{textAlign: "center"}}>        
                <Button 
                    variant="light" 
                    style={{margin: "4px"}}
                    onClick={setBntHandler}
                    >
                    ERC20 컨트랙트 세팅하기
                </Button>
              </td>
            </tr>
            <tr>
              <td style={{fontSize: "18px", color: "gray"}}>{myNftContractDate}</td>
            </tr>
          </table>
        </div>


      </div>
    );
  }
  
  export default ServerPage;
  