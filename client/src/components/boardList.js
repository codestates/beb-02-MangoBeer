// 글 리스트 컴포넌트 

function BoardList({dataInfo}) {

  const boardTrHandler = () => {
    var conId = String(dataInfo.id);
    document.location.href = '/viewContents?' + conId;
  }

  return (

        <tr onClick={boardTrHandler}>
          <td>{dataInfo.id}</td>
          <td>{dataInfo.title}</td>
          <td>{dataInfo.UserId}</td>
          <td>{dataInfo.createdAt}</td>
        </tr>

  );
}

export default BoardList;
