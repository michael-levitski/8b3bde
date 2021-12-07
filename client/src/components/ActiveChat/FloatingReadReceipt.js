import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: ({readReceiptLocation, messageId}) => ({
    height: 15,
    width: 15,
    marginTop: 5,
    display: readReceiptLocation === messageId ? "flex" : "none"
  })
}));

const FloatingReadReceipt = (props) => {
  const { otherUser } = props;
  const classes = useStyles(props);
  return (
      <Avatar
        className={classes.root}
        alt={otherUser.username}
        src={otherUser.photoUrl}
      />
  );
};

export default FloatingReadReceipt;