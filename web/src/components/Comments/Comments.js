import React, { useEffect, useState } from "react";
import {
  Typography, TextField, Button
} from "@mui/material";

import {
  CommentBody, CommentWrapper,
  ProfileImg, ProfileImgWrapper,
  CommentHeader, CommentContent,
  CommentOptions, SubCommentWrapper,
  CommentThreadWrapper, RepliedTo,
  ReplyButton, ReplyField,
  ReplyBoxWrapper, ReplyBody,
  ReplyOptions
} from './CommentsComponents';

// Firebase
import db from '../../utils/firebase';
import { onValue, ref, query, orderByChild, equalTo, push } from "firebase/database";
import { useAuth } from "../../pages/login/AuthContext";

// Images/Icons
import userDefault from '../../images/home/coral_reef.jpg';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

function getTimeDifference(dateTime) {
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
    type = 'second'
  } else if (differenceInSeconds < hour) {
    timeDiff = Math.floor(differenceInSeconds / minute);
    type = 'minute'
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
    return `${timeDiff} ${type} ago`;
  }
  return `${timeDiff} ${type} ago`;
}

function postComment() {

}

function CommentTemplate ({comment, index, subIndex, handleComment, children}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);

  const handleTextChange = (event) => {
    setReplyText(event.target.value);
  }


  return (
    <CommentThreadWrapper key={comment.commentID || subIndex || index}>
      <CommentWrapper>
        <ProfileImgWrapper>
          <ProfileImg
            alt={comment.author || "User Avatar"} 
            src={comment.avatarURL || userDefault}
          />
        </ProfileImgWrapper>
        <CommentBody>
          <CommentHeader>
            <span>@{comment.author}&ensp;</span>
            <span className="postDate">{getTimeDifference(comment.post_date)}</span>
          </CommentHeader>

          <CommentContent>
            {comment.reply_to && <RepliedTo>@{comment.reply_to}&nbsp;</RepliedTo>}
            {comment.content}
          </CommentContent>

          <CommentOptions>
            <span>
              <ThumbUpAltOutlinedIcon />
              {likes > 0 ? likes : ""}
            </span>
            <span>
              <ThumbDownOffAltIcon />
              {dislikes > 0 ? dislikes : ""}
            </span>
            <ReplyButton variant="filledTonal" onClick={() => setReplyOpen(true)}>Reply</ReplyButton>
          </CommentOptions>
        </CommentBody>
      </CommentWrapper>

      {replyOpen &&
        <ReplyBoxWrapper>
          <ProfileImgWrapper>
            <ProfileImg
              alt={comment.author || "User Avatar"} 
              src={comment.avatarURL || userDefault}
            />
          </ProfileImgWrapper>
          <ReplyBody>
            <ReplyField
              variant="standard"
              label={'Add a reply...'}
              multiline
              rows={1}
              onChange={handleTextChange}
            />
            <ReplyOptions>
              <Button
                variant="filledTonal"
                onClick={() => setReplyOpen(false)}
                children="Cancel"
              />
              <Button
                variant="filledTonal"
                onClick={(event) => {
                  handleComment(event, index, subIndex, replyText);
                  setReplyOpen(false);
                }}
                children="Reply"
              />
            </ReplyOptions>
          </ReplyBody>
        </ReplyBoxWrapper>
      }

      {children && 
        <>
          
        </>
      }

      
      {children &&
        <SubCommentWrapper>
          {children}
        </SubCommentWrapper>
      }
    </CommentThreadWrapper>
  );
}

function CommentThread ({ comment, index, handleComment }) {
  return (
    <CommentTemplate
      comment={comment}
      index={index}
      handleComment={handleComment}
    >
      {comment.subcomments?.map((subComment, subIndex) =>
        <CommentTemplate
          comment={subComment}
          index={index}
          subIndex={subIndex}
          handleComment={handleComment}
          key={subComment.commentID || subIndex}
        />
      )}
    </CommentTemplate>
  );
}

function Comments ({ eventID }) {
  const [comments, setComments] = useState([]);
  const { currUser } = useAuth();

  const handleComment = (event, index, subIndex, newComment) => {
    event.preventDefault();
    // DON'T JUST USE 'comments' - MUST USE ARRAY UNPACKING '[...comments]'
    // Modifying state object directly will NOT re-render page
    const updatedComments = [...comments]; // Need array unpacking
    const commentsRef = ref(db, `/comments/${index}/subcomments/`);
    const currDate = new Date();
    let newReply = {
      commentID: null,
      author: currUser.eUsername,
      post_date: currDate.toISOString(),
      content: newComment,
      likes: 0,
      dislikes: 0,
      reply_to: null
    }

    if (subIndex !== null) {
      const replyTo = comments[index].subcomments[subIndex].author
      newReply.reply_to = replyTo
    }

    const newCommentRef = push(commentsRef, newReply);
    newReply.commentID = newCommentRef.key;
    newReply.post_date = currDate
    updatedComments[index].subcomments.push(newReply);
    setComments(updatedComments);
  }

  useEffect(() => {
    // Look in 'comments' collection
    const commentsRef = ref(db, 'comments');
    // Create a query to filter comments based on event_id
    const commentsQuery = query(commentsRef, orderByChild('event_id'), equalTo(eventID));
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
        // comment.subcomments = null;
        comment.post_date = new Date(comment.post_date);
        newComments.push({
          commentID: commentID,
          ...comment,
        });
      }

      // We want comment threads sorted latest to oldest
      newComments.sort((a, b) => {return b.post_date - a.post_date});
      console.log(newComments);
      setComments(newComments);
    });
  }, [eventID]);

  return (
    <>
      {/* Title */}
      <Typography variant="h4" gutterBottom>Comments</Typography>

      {/* All Comment Threads */}
      {comments?.map((comment, index) => (
        <CommentThread
          comment={comment}
          index={index}
          handleComment={handleComment}
          key={comment.commentID || index}
        />
      ))}

      {/* Comment Input */}
      <TextField
        variant="outlined"
        fullWidth
        label="Add a comment"
        multiline
        rows={3}
        style={{ marginBottom: "16px" }}
      />
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </>
  );
}

export default Comments;