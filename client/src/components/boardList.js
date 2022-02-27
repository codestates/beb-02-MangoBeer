// 글 리스트 컴포넌트. froum 페이지에서 글 리스트 보여주는 한 줄에 해당
import { useNavigate} from "react-router";

function BoardList({dataInfo, username, address}) {
  const navigate = useNavigate();

  const boardTrHandler = () => { // 글 리스트 중 하나 클릭하면 해당 글의 id를 통해 해당 글 상세 페이지로 이동
    var conId = String(dataInfo.id);
    navigate('/viewContents?' + conId);
  }

  return (

        <tr onClick={boardTrHandler}> { /* 클릭하면 boardTrHandler 호출 */ }
          <td>{dataInfo.id}</td> { /* props로 받아온 dataInfo 안에서 관련 내용 추출하여 화면에 뿌려주기 */ }
          <td>{dataInfo.title}</td>
          <td>{dataInfo.userName}</td>
          <td>{dataInfo.create_at}</td>
        </tr>

  );
}

export default BoardList;
