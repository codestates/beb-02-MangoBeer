// 글 쓰기 페이지
import React, {useState} from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

function WriteContents() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const writeBtnHandler = () => {
    if(window.confirm("게시글을 작성하시겠습니까?")){
      console.log('게시글 저장 중...')
      // 게시글 저장 API
      // 게시글 저장 시 -> 페이지 이동
      document.location.href = '/forum';
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
