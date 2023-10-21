import styled from "@emotion/styled";
import { css } from "@emotion/react"
import {
  Container, Card,
  CardMedia, CardContent,
  Box, Typography,
  TextField, Button,
  Paper,
} from "@mui/material";

const imageDefaults = css`
  height: 60vh;
`;

const fontDefaults = css`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const StyledEventPage = styled(Container)`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  flex-wrap: wrap;

  min-height: 100vh;
  padding: 80px 0px 0px 50px;
  margin: none !important;
`;

const EventImgs = styled(Card)`
  position: relative;
  border-radius: 40px !important;
`;

const EventLargeImg = styled(CardMedia)`
  ${imageDefaults}
  position: relative;

  filter: blur(30px);
`;

const EventSmallImg = styled(CardMedia)`
  ${imageDefaults}
  position: absolute;
  top: 0;
  left: 12.5%;

  max-width: 75%;
`;

const EventDetailsWrapper = styled(Box)`
  padding: 2.5rem 0 0 0;
  width: 100%;
`;

const EventTitle = styled(Typography)`
  ${fontDefaults}
  margin: 1rem 0 0 0;
  font-weight: 600;
`;

const EventIconWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  width: 100%;
`;

const EventDesc = styled(Typography)`
  ${fontDefaults}
  margin: 0rem;
  padding: 1rem 0rem;
`;

export {
  StyledEventPage, EventImgs,
  EventLargeImg, EventSmallImg,
  EventDetailsWrapper, EventTitle,
  EventIconWrapper, EventDesc
};