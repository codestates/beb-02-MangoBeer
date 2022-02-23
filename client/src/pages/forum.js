// 글 조회 페이지
import { Button, Table } from 'react-bootstrap';
import BoardList from '../components/boardList';
import {useEffect, useState } from 'react';
import axios from 'axios'

function Forum() {
    const [boardDataList, setBoardDataList] = useState([]);

    useEffect(() => {
      axios.get('https://koreanjson.com/posts')
      .then(res => res.data)
      .then(data => {
        setBoardDataList(data.slice(0, 15));
        // console.log(boardDataList);
      })
      .catch(err => console.log(err));
    }, [])


    const createBntHandler = () => {
      document.location.href = '/writeContents';
    }

    return (
      <div className="Forum">
        <h2 style={{marginTop: "50px", marginLeft: "17%", textAlign: "left"}}>Forum</h2>
        
        <div>
          <span style={{marginTop: "10px", marginLeft: "17%", float: "left"}}>자유롭게 게시물을 작성하고 조회해 보세요!</span>
          <Button 
            style={{marginRight: "17%", float: "right"}}
            variant="light" 
            onClick={createBntHandler}
          >
            글 작성하기
          </Button>
        </div>

        <div style={{marginLeft: "17%", marginRight: "17%", marginTop: "100px"}}>

          <Table bordered hover>
            <thead>
              <tr>
                <th style={{width: "5%"}}>No.</th>
                <th style={{width: "60%"}}>제목</th>
                <th>작성자</th>
                <th>작성 일시</th>
              </tr>
            </thead>
            <tbody>
            {
              boardDataList.length == 0?
              ''
              :
              boardDataList.map((dataInfo) => {
                return <BoardList key={dataInfo.id} dataInfo={dataInfo} />
              })
            }
          </tbody>
          </Table>

        </div>
      </div>
    );
  }
  
  export default Forum;
  