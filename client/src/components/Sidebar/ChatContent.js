import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  unreadMessageCount: {
    marginRight: 33,
    alignSelf: "center"
  },
  previewText: (currentUserUnreadCount) => ({
    fontSize: 12,
    letterSpacing: -0.17,
    color: currentUserUnreadCount ? "black" : "#9CADC8",
    fontWeight: currentUserUnreadCount ? "bold" : "inherit"
  })
}));

const ChatContent = (props) => {
  const { conversation } = props;
  const { latestMessageText, otherUser, currentUserUnreadCount } = conversation;
  const classes = useStyles(currentUserUnreadCount);
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {!!currentUserUnreadCount &&
        <Badge
          className={classes.unreadMessageCount}
          badgeContent={currentUserUnreadCount}
          color="primary"
        />
      }
    </Box>
  );
};

export default ChatContent;
