import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";
import TypingBubbleContents from "./TypingBubbleContents";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    marginBottom: 15
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  }
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { message, time, otherUser, isTyping } = props;
  return (
    <Box className={classes.root}>
      <Avatar
        alt={otherUser.username}
        src={otherUser.photoUrl}
        className={classes.avatar}
      />
      <Box>
        <Typography className={classes.usernameDate}>
          {otherUser.username} {!isTyping && time}
        </Typography>
        <Box className={classes.bubble}>
          {isTyping?
            <TypingBubbleContents />:
            <Typography className={classes.text}>{message.text}</Typography>
          }
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
