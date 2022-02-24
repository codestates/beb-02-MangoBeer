// 로그인 페이지

import React, {useState} from 'react';
import axios from 'axios';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [isUser,setIsUser] = useState("");
    const [address,setAddress] = useState("");

    const logInBtnHandler = () => {
      console.log(id+", "+pw)
      try {
        console.log('진입진입! now')

        axios.post("http://localhost:3838/", {
          username: id,
          password: pw,
        })
        .then((res) => {
          console.log("받은 데이터 : "+res.data);
          setIsUser(res.data);
          //console.log("isUser: "+isUser);
        })
      } catch(err) {
        console.log(err);
      }
      // user인지 확인하는 API 호출
      //isUser = true; // API 결과에 따라 isUser flag 값 변경
      setTimeout(() => {
        console.log("isUser: "+isUser);
        if(isUser == "pw_true") { // user라면
          alert("로그인에 성공하였습니다.")
          document.location.href = '/forum'
        } else if(isUser == "pw_false") {
          setIsUser("");
          alert("비밀번호가 일치하지 않습니다.")
        } else if(isUser==="user_false") {
          if(window.confirm("회원 정보가 없습니다. 회원가입 하시겠습니까?")){
            console.log('회원가입 진행 중...')
            // 회원 가입 진행 API
            setIsUser("");
            try{
              axios.post("http://localhost:3838/signup", {
                username: id,
                password: pw,
              })
              .then((res) => {
                console.log('res: '+res)
                setAddress(res.data);
                console.log("회원가입 완료! address : "+ address)
              })
            } catch(err) {
              console.log(err);
            }
          }
        }
      },1000);
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
  