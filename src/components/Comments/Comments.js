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
  ReplyOptions, SeeRepliesButton,
  CommentBoxWrapper
} from './CommentsComponents';

// Firebase
import db from '../../utils/firebase';
import { onValue, ref, query, orderByChild, equalTo, push } from "firebase/database";
import { useAuth } from "../../pages/login/AuthContext";

// Images/Icons
import userDefault from '../../images/home/coral_reef.jpg';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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

function CommentTemplate ({comment, index, subIndex, handleSubComment, children}) {
  const LIKED = 'liked', DISLIKED = 'disliked', DEFAULT = 'default';
  const [replyOpen, setReplyOpen] = useState(false);
  const [seeReplies, setSeeReplies] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);
  const [likeState, setLikeState] = useState(DEFAULT); // Default state is 'default'

  const handleLikeChange = (newLikeState) => {
    setLikeState(newLikeState)
  }

  const handleTextChange = (event) => {
    setReplyContent(event.target.value);
  }

  return (
    <CommentThreadWrapper key={comment.commentID || subIndex || index}>
      <CommentWrapper>
        <ProfileImgWrapper>
          <ProfileImg
            alt={comment.author || "User Avatar"} 
            src={comment.avatar_url || userDefault}
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
              {likeState === LIKED ?
                <ThumbUpAltIcon onClick={() => handleLikeChange(DEFAULT)}/> :
                <ThumbUpOffAltIcon onClick={() => handleLikeChange(LIKED)}/>
              }
              {likes > 0 && likes}
            </span>
            <span>
              {likeState === DISLIKED ?
                <ThumbDownAltIcon onClick={() => handleLikeChange(DEFAULT)}/> :
                <ThumbDownOffAltIcon onClick={() => handleLikeChange(DISLIKED)}/>
              }
              {dislikes > 0 && dislikes}
            </span>
            <ReplyButton
              variant="filledTonal"
              children="Reply"
              onClick={() => setReplyOpen(true)}
            />
          </CommentOptions>
        </CommentBody>
      </CommentWrapper>

      {replyOpen &&
        <ReplyBoxWrapper>
          <ProfileImgWrapper>
            <ProfileImg
              alt={comment.author || "User Avatar"} 
              src={comment.avatar_url || userDefault}
            />
          </ProfileImgWrapper>
          <ReplyBody>
            <ReplyField
              variant="standard"
              label="Add a reply..."
              multiline
              rows={1}
              onChange={handleTextChange}
            />
            <ReplyOptions>
              <Button
                variant="filledTonal"
                children="Cancel"
                onClick={() => setReplyOpen(false)}
              />
              <Button
                variant="filledTonal"
                children="Reply"
                onClick={(event) => {
                  handleSubComment(event, index, subIndex, replyContent) && setReplyOpen(false)
                }}
              />
              
            </ReplyOptions>
          </ReplyBody>
        </ReplyBoxWrapper>
      }
      
      {children &&
        <SubCommentWrapper>
          <SeeRepliesButton
            variant='text'
            onClick={() => setSeeReplies(prev => !prev)}
          >
            {seeReplies ?
              <ArrowDropUpIcon />
              :
              <ArrowDropDownIcon />
            }
            {`${children.length} Replies`}
          </SeeRepliesButton>

          {seeReplies && children}
        </SubCommentWrapper>
      }
    </CommentThreadWrapper>
  );
}

function CommentThread ({ comment, index, handleSubComment }) {
  return (
    <CommentTemplate
      comment={comment}
      index={index}
      handleSubComment={handleSubComment}
    >
      {comment.subcomments?.map((subComment, subIndex) =>
        <CommentTemplate
          comment={subComment}
          index={index}
          subIndex={subIndex}
          handleSubComment={handleSubComment}
          key={subComment.commentID || subIndex}
        />
      )}
    </CommentTemplate>
  );
}

function Comments ({ eventID }) {
  const [comments, setComments] = useState([]);
  const [typing, setTyping] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const { currUser } = useAuth();

  const handleContentChange = (event) => {
    setCommentContent(event.target.value);
  }

  const handleComment = (event, commentContent) => {
    if (commentContent === "") {return false}
    event.preventDefault();
    const updatedComments = [...comments]; // Need array unpacking
    const commentsRef = ref(db, `/comments/`);
    const currDate = new Date();
    let newComment = {
      commentID: null,
      event_id: eventID,
      author: currUser.eUsername,
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

  const handleSubComment = (event, index, subIndex, subCommentContent) => {
    if (subCommentContent === "") {return false}
    event.preventDefault();
    // DON'T JUST USE 'comments' - MUST USE ARRAY UNPACKING '[...comments]'
    // Modifying state object directly will NOT re-render page
    const updatedComments = [...comments]; // Need array unpacking
    const commentsRef = ref(db, `/comments/${index}/subcomments/`);
    const currDate = new Date();
    let newSubComment = {
      commentID: null,
      author: currUser.eUsername,
      avatar_url: null,
      post_date: currDate.toISOString(),
      content: subCommentContent,
      likes: 0,
      dislikes: 0,
      reply_to: null
    }

    if (subIndex !== null && subIndex !== undefined) {
      const replyTo = comments[index].subcomments[subIndex].author
      newSubComment.reply_to = replyTo
    }

    const newCommentRef = push(commentsRef, newSubComment);
    newSubComment.commentID = newCommentRef.key;
    newSubComment.post_date = currDate
    updatedComments[index].subcomments.push(newSubComment);
    setComments(updatedComments);
    return true;
  }

  useEffect(() => {
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
  }, [eventID]);

  return (
    <>
      {/* Title */}
      <Typography variant="h4" gutterBottom>Comments</Typography>

      {/* Comment Input */}
      <CommentBoxWrapper>
        <ProfileImgWrapper>
          <ProfileImg alt={ "User Avatar"} src={userDefault}/>
        </ProfileImgWrapper>
        <ReplyBody>
          <ReplyField
            variant="standard"
            label="Add a comment..."
            multiline
            rows={1}
            onClick={() => setTyping(true)}
            onChange={handleContentChange}
          />
          {typing &&
            <ReplyOptions>
              <Button
                variant="filledTonal"
                children="Cancel"
                onClick={() => setTyping(false)}
              />
              <Button
                variant="filledTonal"
                children="Reply"
                onClick={(event) => {
                  handleComment(event, commentContent) && setTyping(false)
                }}
              />
            </ReplyOptions>
          }
        </ReplyBody>
      </CommentBoxWrapper>


      {/* All Comment Threads */}
      {comments?.map((comment, index) => (
        <CommentThread
          comment={comment}
          index={index}
          handleSubComment={handleSubComment}
          key={comment.commentID || index}
        />
      ))}
    </>
  );
}

export default Comments;