import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";

const avatarStyle = {
  height: 15,
  width: 15,
  marginTop: 5,
}

const useStyles = makeStyles(() => ({
  visible: {
    ...avatarStyle,
    display: "flex"
  },
  hidden: {
    ...avatarStyle,
    display: "none"
  }
}));

const FloatingReadReceipt = (props) => {
  const { otherUser, messageId, readReceiptLocation } = props;
  const classes = useStyles();
  const { visible, hidden } = classes;
  return (
      <Avatar
        className={readReceiptLocation ===  messageId ? visible : hidden}
        alt={otherUser.username}
        src={otherUser.photoUrl}
      />
  );
};

export default FloatingReadReceipt;