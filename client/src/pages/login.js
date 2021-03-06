// 로그인 페이지

import React, {useState} from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const logInBtnHandler = () => {
      
      let isUser = false;
      // user인지 확인하는 API 호출
      isUser = true; // API 결과에 따라 isUser flag 값 변경

      if(isUser) { // user라면
        alert("로그인에 성공하였습니다.")
        document.location.href = '/forum'
      }
      else {
        if(window.confirm("회원 정보가 없습니다. 회원가입 하시겠습니까?")){
          console.log('회원가입 진행 중...')
          // 회원 가입 진행 API
        }
      }
    }

    return (
      <div className="Login">
        <h2 style={{margin: "50px"}}>Log-in</h2>

        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <InputGroup className="mb-3" style={{width: "30%"}}>
            <InputGroup.Text id="userName">Username</InputGroup.Text>
            <FormControl
              placeholder="Username"
              value={id}
              onChange={(e)=> {
                setId(e.target.value); 
                // console.log(id);
              }}
            />
          </InputGroup>

          <InputGroup className="mb-3" style={{width: "30%"}}>
            <InputGroup.Text id="password">Password</InputGroup.Text>
            <FormControl
              type = "password"
              placeholder="Password"
              value={pw}
              onChange={(e)=>{
                setPw(e.target.value);
                // console.log(pw);
              }}
            />
          </InputGroup>
        </div>
        
        <Button 
          variant="light" 
          style={{margin: "30px"}}
          onClick={logInBtnHandler}
        >
        Log-in
        </Button>
        
      </div>
    );
  }
  
  export default Login;
  