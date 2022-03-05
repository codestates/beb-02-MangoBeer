// 로그인 페이지

import React, {useEffect, useState} from 'react';
import { useNavigate} from "react-router";
import axios from 'axios';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({username,setUsername,address,setAddress}) {
    const [pw, setPw] = useState("");
    const [isUser,setIsUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => { 
        console.log("확인: "+isUser+" : "+username+" : " + address);
        if(isUser === "input_false") { // 입력이 안된부분이 있다면
          setIsUser("");
          alert("입력이 안된 부분이 있습니다.")
        } else if(isUser === "pw_true") { // username password 일치
          alert("로그인에 성공하였습니다.")
          // document.location.href = '/forum'
          navigate('/forum');
        } else if(isUser === "pw_false") { // username 일치, password 불일치
          setIsUser("");
          alert("비밀번호가 일치하지 않습니다.")
        } else if(isUser==="user_false") { // username 불일치
          if(window.confirm("회원 정보가 없습니다. 회원가입 하시겠습니까?")){
            console.log('회원가입 진행 중...')
            // 회원 가입 진행 API
            setIsUser("");
            try{
              axios.post("http://localhost:4000/signup", {
                username: username,
                password: pw,
              })
              .then((res) => {
                setAddress(res.data);
                alert("회원가입 완료되었습니다.\n로그인 다시 진행해주세요.")
              })
            } catch(err) {
              console.log(err);
            }
          } else { setIsUser(''); }
        } else { setIsUser(''); }
    },[isUser]);

    const LogInBtnHandler = () => {
      try {
        axios.post("http://localhost:4000/", {
          username: username,
          password: pw,
        })
        .then((res) => {
          if(res.data.address){
            setAddress(res.data.address);
            console.log(res.data.address);
          }
          setIsUser(res.data.isuser);
        })
      } catch(err) {
        console.log(err);
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
              value={username}
              onChange={(e)=> {
                setUsername(e.target.value); 
                console.log(e.target.value);
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
          onClick={LogInBtnHandler}
        >
        Log-in
        </Button>
        
      </div>
    );
  }
  
  export default Login;
  