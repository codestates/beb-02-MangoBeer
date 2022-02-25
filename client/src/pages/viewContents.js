// 글 내용 보기
import {useEffect, useState} from 'react';
import {Table, InputGroup, FormControl, Button} from 'react-bootstrap';
import axios from 'axios';
import Comment from '../components/comment';

function ViewContents() {
    const contentsId = document.location.search.slice(1);
    const [contentsInfo, setContentsInfo] = useState({});
    const [commentInfo, setCommentInfo] = useState([]);
    
    const [newComment, setNewComment] = useState('');

    useEffect(async () => {

      getPost();
      getComment();

    }, []);

    const getPost = () => {

      axios.get('http://localhost:4000/forum/' + contentsId) // 게시글 하나만 불러오기
      .then(res => res.data)
      .then(data => {
        // console.log('게시글!!!!', data[0]);
        setContentsInfo(data[0]);
      })
      .catch(err => console.log(err));

    }

    const getComment = () => {

      axios.get('http://localhost:4000/comments', { 
        params: {
          post_id: contentsId
        }
       }) // 게시글 id에 맞는 댓글 불러오기
      .then(res => res.data)
      .then(data => {
        // console.log('댓글!!!!', data);
        setCommentInfo(data.reverse());
      })
      .catch(err => console.log(err));

    }

    const commentBntHandler = () => {
      if(window.confirm("댓글을 작성하시겠습니까?")){
        console.log('댓글 작성 중 ...')
        // 댓글 작성 API 호출 ...
        // 이후 댓글 작성되면 방금 전에 작성한 댓글이 잘 보이는지 확인
        axios.post('http://localhost:4000/comments', {
          userName: 'temp_user',
          comments: newComment,
          post_id: contentsId
        })
        .then(res => res.data)
        .then(data => {
          // console.log('새 댓글!!!!', data);
          setNewComment('');
          getComment();
        })
      }
    }

    return (
      <div className="ViewContents">
        
        <div className='Content' style={{marginLeft: "17%", marginRight: "17%", marginTop: "50px"}}>
        
            <span style={{margin: "10px", float: "right"}}>작성자 {contentsInfo.userName} | 작성 일시  {contentsInfo.create_at}</span>

            <Table bordered>
                <thead 
                  size='lg' 
                  style={{backgroundColor: "rgba(204, 204, 204, .3)"}}
                >
                  <tr>
                    <th style={{padding: "15px"}}>
                      {contentsInfo.title}
                    </th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                  <td style={{padding: "20px"}}>
                    {contentsInfo.content}
                  </td>
                </tr>
              </tbody>
              </Table>

          </div>

        <div className='Comment' style={{marginLeft: "17%", marginRight: "17%", marginTop: "50px"}}>
            <h5 style={{marginBottom: "20px", textAlign: "left"}}>댓글</h5>
            
            <InputGroup className="mb-3">
              <FormControl
                placeholder="댓글을 작성해보세요."
                value={newComment}
                onChange={(e)=>{
                  setNewComment(e.target.value);
                  // console.log(newComment);
                }}
              />
              <Button 
                variant="outline-secondary" 
                id="button-addon2"
                onClick={commentBntHandler}>
                댓글 쓰기
              </Button>
            </InputGroup>

            <Table>
              <tbody>
                {
                  commentInfo.length == 0?
                  ''
                  :
                  commentInfo.map((commentInfo) => {
                    return <Comment key={commentInfo.id} commentInfo={commentInfo} />
                  })
                }
              </tbody>

            </Table>
        </div>
      </div>
    );
  }
  
export default ViewContents;
  