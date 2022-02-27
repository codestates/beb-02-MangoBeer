// 글 조회 페이지
import { Button, Table } from 'react-bootstrap';
import BoardList from '../components/boardList';
import {useEffect, useState } from 'react';
import { useNavigate} from "react-router";
import axios from 'axios' // API 호출에 사용

function Forum({username,address}) {
    const [boardDataList, setBoardDataList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      axios.get('http://localhost:4000/forum') // get /forum API 호출
      .then(res => res.data) // 호출 성공 하면, response의 json 부분 추출(여기서는 /forum 호출의 결과이니 전체 게시물임)
      .then(data => {
        setBoardDataList(data.reverse()); // API로 받아온 게시물 전체 list를 boardDataList 변수에다가 저장
      })
      .catch(err => console.log(err)); // 에러 난다면 에러 캐치
    }, [])


    const createBntHandler = () => {
      navigate('/writeContents');
    }

    return (
      <div className="Forum">
        <div>
        <h2 style={{marginTop: "50px", marginLeft: "17%", textAlign: "left"}}>Forum</h2>
        
          <span style={{marginTop: "10px", marginLeft: "17%", float: "left"}}>자유롭게 게시물을 작성하고 조회해 보세요!</span>
          <Button 
            style={{marginRight: "17%", float: "right"}}
            variant="light" 
            onClick={createBntHandler} // 이 버튼 누르면 createBntHandler 함수 실행(글 작성 페이지로 이동)
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
              boardDataList.length == 0? // 저장된 boardDataList 안에 내용이 있는지 확인(0이면 내용이 없는거임)
              '' // 없다면 게시글이 하나도 없다는 뜻이니 화면에 아무것도 출력하지 않음
              :
              boardDataList.map((dataInfo) => { // 안에 내용이 있다면, 게시글 요소 하나하나에 map을 통해 접근
                return <BoardList key={dataInfo.id} dataInfo={dataInfo} username={username} address={address} /> // 게시글 하나의 정보 요소(dataInfo)를 BoardList component에 props로 넘기기
              })
            }
          </tbody>
          </Table>

        </div>
      </div>
    );
  }
  
  export default Forum;
  