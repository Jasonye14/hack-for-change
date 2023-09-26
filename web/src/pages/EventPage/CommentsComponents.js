import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Avatar, Button, TextField } from "@mui/material";

const CommentThreadWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 1rem;
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

const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
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

const SubCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding-left: 2.5rem;
  border-left: 3px solid lightgray;
  border-radius: 3px 0 0 3px;
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
  ReplyButton
}