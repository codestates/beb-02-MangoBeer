// 글 조회 페이지
import {Button } from 'react-bootstrap';

function Forum() {

    const createBntHandler = () => {
      document.location.href = '/writeContents';
    }

    return (
      <div className="Forum">
        <h2 style={{marginTop: "50px", marginLeft: "15%", textAlign: "left"}}>Forum</h2>

        <div>
          <span style={{marginTop: "10px", marginLeft: "15%", float: "left"}}>자유롭게 게시물을 작성하고 조회해 보세요!</span>
          <Button 
            style={{marginRight: "15%", float: "right"}}
            variant="light" 
            onClick={createBntHandler}
          >
            글 작성하기
          </Button>
        </div>
      </div>
    );
  }
  
  export default Forum;
  