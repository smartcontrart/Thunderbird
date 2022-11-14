import React, {useState, useEffect} from "react";
import NewComment from './comments/NewComment'
import CommentList from './comments/CommentList'
import { postComment, getComments } from '../../services/api.js'

export default function Comments(props) {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  function submitComment(event){
    event.preventDefault();
    async function newComment(){
      let comment = await postComment(props.video, event.target.elements.comment.value)
      let comments = await getComments(props.video)
      // console.log(comment)
      // console.log(comments)
      setComments(comments)
      return comment
    }
    newComment()
  }

  useEffect(() => {
    async function fetchComments(){
      const comments_fetched = await getComments(props.video)
      console.log(comments_fetched)
      setComments(comments_fetched)
      setIsLoading(false)
    }
    fetchComments();
  }, [comments.length])

  return (
      <React.Fragment>
          <NewComment submitComment={submitComment}/>
          <CommentList isLoading={isLoading} comments={comments}/>
      </React.Fragment>
  );
}
