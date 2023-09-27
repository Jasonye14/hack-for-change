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
import { onValue, ref, query, orderByChild, equalTo } from "firebase/database";

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
    return `${timeDiff} ${type}s ago`;
  }
  return `${timeDiff} ${type} ago`;
}

function CommentTemplate ({comment, children}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);


  return (
    <CommentThreadWrapper key={comment.commentID}>
      <CommentWrapper>
        <ProfileImgWrapper>
          <ProfileImg
            alt={comment.author || "User Avatar"} 
            src={comment.avatarURL || userDefault}
          />
        </ProfileImgWrapper>
        <CommentBody>
          <CommentHeader>
            @{comment.author}&ensp;
            <span className="postDate">{getTimeDifference(comment.post_date)}</span>
          </CommentHeader>

          <CommentContent>
            {comment.reply_to && <RepliedTo>@{comment.reply_to}&nbsp;</RepliedTo>}
            {comment.content}
          </CommentContent>

          <CommentOptions>
            <span><ThumbUpAltOutlinedIcon />{likes}</span>
            <span><ThumbDownOffAltIcon />{dislikes}</span>
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
            / >
            <ReplyOptions>
              <Button
                variant="filledTonal"
                onClick={() => setReplyOpen(false)}
              >Cancel</Button>
              <Button variant="filledTonal">Reply</Button>
            </ReplyOptions>
          </ReplyBody>
        </ReplyBoxWrapper>
      }

      

      <SubCommentWrapper>
        {children}
      </SubCommentWrapper>
    </CommentThreadWrapper>
  );
}

function CommentThread ({ comment }) {
  return (
    <CommentTemplate comment={comment}>
      {comment.subcomments?.map((subComment) =>
        <CommentTemplate comment={subComment} key={subComment.commentID}/>
      )}
    </CommentTemplate>
  );
}

function Comments ({ eventID }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Look in 'comments' collection
    const commentsRef = ref(db, 'comments');
    // Create a query to filter comments based on event_id
    const commentsQuery = query(commentsRef, orderByChild('event_id'), equalTo(eventID));
    onValue(commentsQuery, snapshot => {
      const data = Object.entries(snapshot.val());
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
      {comments?.map((comment) => (
        <CommentThread comment={comment} key={comment.commentID} />
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