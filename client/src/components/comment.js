function Comment({commentInfo}) {
  
    return (
        <>
                <tr>
                  <th rowSpan={2} style={{textAlign: "left", width:"80%"}}>{commentInfo.content}</th>
                  <th style={{fontSize: "12px", fontWeight: "normal"}}>{commentInfo.createdAt}</th>
                </tr>
                <tr>
                  <th style={{fontSize: "12px", fontWeight: "normal"}}>{commentInfo.UserId}</th>
                </tr>
        </>
  
    );
  }
  
  export default Comment;
  