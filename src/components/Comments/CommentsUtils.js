// Firebase
import db from '../../utils/firebase';
import { onValue, ref, query, orderByChild, equalTo, push, runTransaction } from "firebase/database";

// Final vars
const COMMENT_REF = `/comments/`;

function calcTimeDifference(dateTime) {
  const postDate = new Date(dateTime);
  if (isNaN(postDate.getTime())) {
    return dateTime;
  }
  const currentDate = new Date();
  const differenceInSeconds = Math.floor((currentDate - postDate) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  let timeDiff = 0;
  let type = "";

  if (differenceInSeconds < minute) {
    timeDiff = differenceInSeconds
    type = 'sec'
  } else if (differenceInSeconds < hour) {
    timeDiff = Math.floor(differenceInSeconds / minute);
    type = 'min'
  } else if (differenceInSeconds < day) {
    timeDiff = Math.floor(differenceInSeconds / hour);
    type = 'hour'
  } else if (differenceInSeconds < week) {
    timeDiff = Math.floor(differenceInSeconds / day);
    type = 'day'
  } else if (differenceInSeconds < month) {
    timeDiff = Math.floor(differenceInSeconds / week);
    type = 'week'
  } else if (differenceInSeconds < year) {
    timeDiff = Math.floor(differenceInSeconds / month);
    type = 'month'
  } else {
    timeDiff = Math.floor(differenceInSeconds / year);
    type = 'year'
  }

  if (timeDiff > 1) {
    return `${timeDiff} ${type}s ago`;
  }
  return `${timeDiff} ${type} ago`;
}

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

function postSubComment(user, index, subIndex, subCommentContent, oldComments, setComments) {
  if (subCommentContent === "") {return false}
  const updatedComments = [...oldComments]; // DON'T JUST USE 'comments' - MUST USE ARRAY UNPACKING '[...comments]'
  const commentID = updatedComments[index].commentID
  const commentsRef = ref(db, COMMENT_REF + `${commentID}/subcomments`);
  const currDate = new Date();
  let newSubComment = {
    commentID: null,
    author: user.eUsername,
    avatar_url: null,
    post_date: currDate.toISOString(),
    content: subCommentContent,
    likes: 0,
    dislikes: 0,
    reply_to: null
  }

  if (subIndex) {
    const replyTo = oldComments[index].subcomments[subIndex].author
    newSubComment.reply_to = replyTo
  }

  const newCommentRef = push(commentsRef, newSubComment);
  newSubComment.commentID = newCommentRef.key;
  newSubComment.post_date = currDate;
  updatedComments[index].subcomments ??= [];
  updatedComments[index].subcomments.push(newSubComment);
  setComments(updatedComments);
  return true;
}

function getComments(eventID, setComments) { // setComments is a callback
  const commentsRef = ref(db, COMMENT_REF); // Look in 'comments' collection
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

function putLikes(user, commentID, subCommentID, newLikes) {
  let likesRef = null;
  if (subCommentID) {
    likesRef = ref(db, COMMENT_REF + `${commentID}/subcomments/${subCommentID}/likes`);
  }
  else {
    likesRef = ref(db, COMMENT_REF + `${commentID}/likes`);
  }

  runTransaction(likesRef, (oldLikes) => {
    return newLikes;
  }).then(res => {
    // console.log(res);
  }).catch(err => {
    console.log(err);
  });
}

function putDislikes(user, commentID, subCommentID, newDislikes) {
  let dislikesRef = null;
  if (subCommentID) {
    dislikesRef = ref(db, COMMENT_REF + `${commentID}/subcomments/${subCommentID}/dislikes`);
  }
  else {
    dislikesRef = ref(db, COMMENT_REF + `${commentID}/dislikes`);
  }

  runTransaction(dislikesRef, (oldLikes) => {
    return newDislikes;
  }).then(res => {
    // console.log(res);
  }).catch(err => {
    console.log(err);
  });
}

export {
  calcTimeDifference,
  postComment,
  postSubComment,
  getComments,
  putLikes,
  putDislikes
};