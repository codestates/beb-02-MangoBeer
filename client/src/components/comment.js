function Comment({commentInfo}) {
  
    return (
        <>
                <tr>
                  <th rowSpan={2} style={{textAlign: "left", width:"80%"}}>{commentInfo.comments}</th>
                  <th style={{fontSize: "12px", fontWeight: "normal"}}>{commentInfo.create_at}</th>
                </tr>
                <tr>
                  <th style={{fontSize: "12px", fontWeight: "normal"}}>{commentInfo.userName}</th>
                </tr>
        </>
  
    );
  }
  
  export default Comment;
  