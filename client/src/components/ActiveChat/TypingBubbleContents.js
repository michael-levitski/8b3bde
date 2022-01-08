import React from "react";
import { Box, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    padding: "12px 10px"
  },
  avatar: {
    margin: 2,
    width: 8,
    height: 8,
    opacity: 0.5,
    backgroundColor: "white"
  }
}));

const TypingDot = () => {
  const { avatar: avatarStyles } = useStyles();
  return <Avatar variant="circle" className={avatarStyles}>&nbsp;</Avatar>
};

const TypingBubbleContents = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <TypingDot styling={classes.avatar} />
      <TypingDot styling={classes.avatar} />
      <TypingDot styling={classes.avatar} />
    </Box>
  );
};

export default TypingBubbleContents;
