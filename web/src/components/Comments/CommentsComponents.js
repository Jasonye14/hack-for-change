import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Avatar, Button, TextField } from "@mui/material";

// ------------ Comment Template Styling ------------- //
const CommentThreadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-block: 0.5rem;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem 0 0;
`;

const ProfileImg = styled(Avatar)`
  width: 2.7rem;
  height: 2.7rem;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.span`
  display: flex;
  flex-direction: row;

  span.postDate {
    color: #a7a6a9;
  }
`;

const CommentContent = styled.p`
  display: flex;
  flex-direction: row;
  margin: 0.4rem 0 0 0;
  line-height: 1.6;
`;

const CommentOptions = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-top: 0.7rem;

  svg:hover {
    cursor: pointer;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }
`;

const ReplyButton = styled(Button)`
  padding: 0;
`;

const SeeRepliesButton = styled(Button)`
  padding: 0.3rem;

  width: 10rem;
  border-radius: 1rem;
`;

// ------------ Reply Input Styling ------------- //
const CommentBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const ReplyBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: 2.5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const ReplyBody = styled.div`
  display: flex;
  flex-direction: column;

  width: 80%;
`;

const ReplyField = styled(TextField)`
  width: 100%;
`;

const ReplyOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 0.5rem;
  margin-top: 0.2rem;
`;

// ------------ SubComment Styling ------------- //
const SubCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding-left: 2.5rem;
  margin-top: 0.5rem;
`;

const RepliedTo = styled.span`
  color: lightskyblue;
`;


export {
  CommentBody, CommentWrapper,
  ProfileImg, ProfileImgWrapper,
  CommentHeader, CommentContent,
  CommentOptions, SubCommentWrapper,
  CommentThreadWrapper, RepliedTo,
  ReplyButton, ReplyField,
  ReplyBoxWrapper, ReplyBody,
  ReplyOptions, SeeRepliesButton,
  CommentBoxWrapper
}