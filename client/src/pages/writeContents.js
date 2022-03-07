// 글 쓰기 페이지
import React, {useState} from 'react';
import { useNavigate } from "react-router";
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

function WriteContents({username,address}) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const navigate = useNavigate();

  const writeBtnHandler = () => {
    if(window.confirm("게시글을 작성하시겠습니까?")){
      console.log('게시글 저장 중...')
      // 게시글 저장 API
      // 게시글 저장 시 -> 페이지 이동

      axios.post('http://localhost:4000/write', {
        userName: username,
        title: title,
        content: contents
      })
      .then(res => res.data)
      .then(async (data) => {
        setTitle('');
        setContents('');
        const flag = await serveToken();
        if (flag){
          alert('토큰이 지급되었습니다.');
        }
        else{
          alert('토큰 지급이 실패하였습니다.');
        }
        navigate('/forum');
      })
      .catch(err => {
        console.log(err);
        alert('토큰 지급이 실패하였습니다.');
        alert(err.toString());
      });

    }
  }

  const serveToken = async () => {
    try{
      const res = await axios.post('http://localhost:4000/mintToken', {
        amount: '1000000000000000000',
        to: address
      });
  
      console.log('res>>', res);
      return true;
    }
    catch(error) {
      console.log('err>>', error);
      return false;
    }

  }
  


  return (
    <div className="WriteContents">

      <h2 style={{margin: "50px", textAlign: "center"}}>Write Contents</h2>

      
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <InputGroup size="lg" className="mb-3" style={{width: "60%"}}>
            <InputGroup.Text id="contentsTitle">글 제목</InputGroup.Text>
            <FormControl
              placeholder="글 제목"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                // console.log(title);
              }}
            />
          </InputGroup>

          <InputGroup  style={{width: "60%"}}>
            <FormControl 
              as="textarea" 
              style={{height: "400px", resize: "none"}}
              value={contents}
              onChange={(e) => {
                setContents(e.target.value);
                // console.log(contents);
              }}
            />
          </InputGroup>
      </div>


        <Button 
          size='lg'
          variant="light" 
          style={{margin: "50px"}}
          onClick={writeBtnHandler}
        >
        작성하기
        </Button>
    </div>
  );
}

export default WriteContents;
