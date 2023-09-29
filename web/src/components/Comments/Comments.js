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

function CommentTemplate ({comment, index, subIndex, setComments, children}) {
  const { isLoggedIn, currUser, pending } = useAuth();
  const [replyOpen, setReplyOpen] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);
  const [replyText, setReplyText] = useState("");

  const handleTextChange = (event) => {
    setReplyText(event.target.value);
  }

  const handleReply = (event) => {
    event.preventDefault();
    if (index) {
      setComments(currComments => {
        currComments.push({
          commentID: "",
          author: currUser,

        })
      });
      const comments = {
        comment_id: {
          author: "string",
          event_id: "idk what this is (string i think?)",
          post_date: "also idk (datetime object or string)",
          content: "string",
          like: "number/integer",
          dislike: "number/integer",
          subcomments: {
            sub_comment_id: {
              author: "string", // This would be username
              reply_to: "author",
              post_date: "also idk (datetime object or string)",
              content: "string",
              like: "number/integer",
              dislike: "number/integer"
            },
          }
        },
      }
      setComments();
    } else {

    }
  }


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
                onClick={() => {}}
                children="Reply"
              />
            </ReplyOptions>
          </ReplyBody>
        </ReplyBoxWrapper>
      }

      
      {children &&
        <SubCommentWrapper>
          {children}
        </SubCommentWrapper>
      }
    </CommentThreadWrapper>
  );
}

function CommentThread ({ comment, index, setComments }) {
  return (
    <CommentTemplate
      comment={comment}
      index={index}
      setComments={setComments}
    >
      {comment.subcomments?.map((subComment, subIndex) =>
        <CommentTemplate
          comment={subComment}
          index={index}
          subIndex={subIndex}
          setComments={setComments}
          key={subComment.commentID || subIndex}
        />
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
          setComments={setComments}
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