export const readMessagesInStore = (state, payload) => {
  const { conversationId, senderId } = payload;
  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };

      convoCopy.messages = convo.messages.map((message) => {
        if (message.senderId !== senderId) return message;
        return {...message, isRead: true};
      });

      if (senderId === convo.otherUser.id) {
        convoCopy.currentUserUnreadCount = 0;
      } else {
        convoCopy.otherUserUnreadCount = 0;
      }
      convoCopy.readReceiptLocation = -1;

      const { messages, otherUserUnreadCount } = convoCopy;
      const lastMessageIndex = messages.length - 1;  
      let numOwnMessagesSkipped = 0;
      
      for (let i = lastMessageIndex; i >= 0; --i) {
        const message = messages[i];
        if (message.senderId === convo.otherUser.id) {
          continue;
        }
        if (numOwnMessagesSkipped < otherUserUnreadCount) {
          ++numOwnMessagesSkipped;
          continue;
        } 
        convoCopy.readReceiptLocation = message.id;
        break;
      }      
      return convoCopy;
    } else {
      return convo;
    }
  });
}

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      currentUserUnreadCount: 1,
      otherUserUnreadCount: 0,
      readReceiptLocation: -1
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages = [...convo.messages, message];
      convoCopy.latestMessageText = message.text;

      if (message.senderId === convo.otherUser.id) {
        convoCopy.currentUserUnreadCount += 1;
      } else {
        convoCopy.otherUserUnreadCount += 1;
      }
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { 
        otherUser: user,
        messages: [],
        currentUserUnreadCount: 0,
        otherUserUnreadCount: 0,
        readReceiptLocation: -1
      };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo };
      convoCopy.id = message.conversationId;
      convoCopy.messages = [...convo.messages, message];
      convoCopy.latestMessageText = message.text;

      if (recipientId === convo.otherUser.id) {
        convoCopy.otherUserUnreadCount += 1;
      } else {
        convoCopy.currentUserUnreadCount += 1;
      }
      
      return convoCopy;
    } else {
      return convo;
    }
  });
};
