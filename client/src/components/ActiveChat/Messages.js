import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { readMessages } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const Messages = (props) => {
  const { messages, otherUser, userId, conversationId, readMessages } = props;

  React.useEffect(() => {
    if (conversationId){
      const otherUserId = otherUser.id;
      readMessages({ conversationId, senderId: otherUserId });
    }
  }, [messages.length]);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    readMessages: (data) => {
      dispatch(readMessages(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(Messages);
