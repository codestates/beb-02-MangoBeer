// 트랜잭션 리스트 컴포넌트 

function TxList({dataInfo}) {

  
    return (
  
          <tr>
            <td>{dataInfo.from}</td>
            <td>{dataInfo.to}</td>
            <td>{dataInfo.amount}</td>
            <td>{dataInfo.hash}</td>
          </tr>
  
    );
  }
  
  export default TxList;
  