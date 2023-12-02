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
import { postComment, postSubComment, getComments, calcTimeDifference, putLikes, putDislikes } from "./CommentsUtils";

// Images/Icons
import userDefault from '../../images/home/coral_reef.jpg';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function CommentTemplate ({comment, index, subIndex, handleSubComment, children}) {
  const LIKED = 'liked', DISLIKED = 'disliked', DEFAULT = 'default';
  const [replyOpen, setReplyOpen] = useState(false);
  const [seeReplies, setSeeReplies] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);
  const [likeState, setLikeState] = useState(DEFAULT); // Default state is 'default'

  

  const handleLikeChange = (index, subIndex, newLikeState) => {
    if (newLikeState === likeState ||
      (newLikeState !== LIKED
      && newLikeState !== DISLIKED
      && newLikeState !== DEFAULT)
    ) {
      return false;
    }

    if (newLikeState === DEFAULT) {
      if (likeState === LIKED) {
        
      } else { // DISLIKED

      }
    } else if (likeState === DEFAULT) {
      if (newLikeState === LIKED) {
        
      } else {

      }
    } else {
      if (newLikeState === LIKED) {

      } else {
        
      }
    }

    const commentsRef = ref(db, `/comments//`);
    const currDate = new Date();

    setLikeState(newLikeState);
    return true;
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
            <span className="postDate">{calcTimeDifference(comment.post_date)}</span>
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
    event.preventDefault();
    return postComment(currUser, eventID, commentContent, comments, setComments);
  }

  const handleSubComment = (event, index, subIndex, subCommentContent) => {
    event.preventDefault();
    return postSubComment(currUser, index, subIndex, subCommentContent, comments, setComments);
  }

  useEffect(() => {
    getComments(eventID, setComments);
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