import React from "react";
import { Box, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const previewTextStyle = {
  fontSize: 12,
  color: "#9CADC8",
  letterSpacing: -0.17,
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  unreadPreviewText: {
    ...previewTextStyle,
    color: "black",
    fontWeight: "bold"
  },
  readPreviewText: {
    ...previewTextStyle
  },
  unreadMessageCount: {
    marginRight: 20,
    alignSelf: "center"
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, currentUserUnreadCount } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={currentUserUnreadCount ? classes.unreadPreviewText: classes.readPreviewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {!!currentUserUnreadCount &&
        <Chip
          className={classes.unreadMessageCount}
          label={currentUserUnreadCount}
          color="primary"
          size="small"
        />}
    </Box>
  );
};

export default ChatContent;
