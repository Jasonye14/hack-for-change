// Firebase
import db from '../../utils/firebase';
import { onValue, ref, query, orderByChild, equalTo, push } from "firebase/database";



const COMMENT_REF = `/comments/`;



function postComment(user, eventID, commentContent, oldComments, setComments) { // setComments in a callback
  if (commentContent === "") {return false}
  const updatedComments = [...oldComments];
  const commentsRef = ref(db, COMMENT_REF);
  const currDate = new Date();
  let newComment = {
    commentID: null,
    event_id: eventID,
    author: user.eUsername,
    avatar_url: null,
    post_date: currDate.toISOString(),
    content: commentContent,
    likes: 0,
    dislikes: 0,
    subcomments: null
  }

  const newCommentRef = push(commentsRef, newComment);
  newComment.commentID = newCommentRef.key;
  newComment.post_date = currDate
  updatedComments.push(newComment);
  setComments(updatedComments);
  return true;
}

function getComments(eventID, setComments) { // setComments is a callback
  const commentsRef = ref(db, 'comments'); // Look in 'comments' collection
  const commentsQuery = query(commentsRef, orderByChild('event_id'), equalTo(eventID)); // Create a query to filter comments based on event_id
  onValue(commentsQuery, snapshot => {
    const snapshotValue = snapshot.val();
    if (!snapshotValue) {
        console.error("Snapshot value is null or undefined. No comments to process.");
        setComments([]);
        return;
    }
    const data = Object.entries(snapshotValue);
    const newComments = [];
    
    // Convert comment threads (Object) to an array
    for (let [commentID, comment] of data) {
      if (comment.subcomments) {
        const subData = Object.entries(comment.subcomments);
        const newSubComments = [];

        // Convert subcomments (Object) to an array
        for (let [subID, subComment] of subData) {
          subComment.post_date = new Date(subComment.post_date);
          newSubComments.push({
            commentID: subID,
            ...subComment
          });
        }

        // We want replies sorted oldest to latest
        newSubComments.sort((a, b) => {return a.post_date - b.post_date});

        comment.subcomments = newSubComments;
        comment.post_date = new Date(comment.post_date);
      }
      newComments.push({
        commentID: commentID,
        ...comment,
      });
    }

    // We want comment threads sorted latest to oldest
    newComments.sort((a, b) => {return b.post_date - a.post_date});
    setComments(newComments);
  });
}

export {postComment};