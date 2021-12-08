const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

router.put("/:conversationId/messages", async (req, res, next) => {
  try {
    const { user } = req;
    const { isRead } = req.body;
    const { conversationId } = req.params;

    if (!user) {
      return res.sendStatus(401);
    }

    if (!req.query.senderId || isRead == undefined) {
      return res.sendStatus(400);
    }

    const conversation = await Conversation.findOne({
      where: { id: conversationId }
    });

    if (!conversation) {
      return res.sendStatus(400);
    }

    const { user1Id, user2Id } = conversation;
    const { id } = user;

    if (user1Id !== id && user2Id !== id) {
      return res.sendStatus(401); 
    }

    await Message.update(
      { isRead }, 
      {
        where: {
          conversationId,
          senderId: req.query.senderId,
          isRead: false
        }
      }
    );
    res.sendStatus(204);

  } catch (error) {
    next(error);
  }
})

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const userId = req.user.id;
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: {
          user1Id: userId,
          user2Id: userId,
        },
      },
      attributes: ["id"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        { model: Message, order: ["createdAt", "DESC"] },
        {
          model: User,
          as: "user1",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
        {
          model: User,
          as: "user2",
          where: {
            id: {
              [Op.not]: userId,
            },
          },
          attributes: ["id", "username", "photoUrl"],
          required: false,
        },
      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      if (convoJSON.user1) {
        convoJSON.otherUser = convoJSON.user1;
        delete convoJSON.user1;
      } else if (convoJSON.user2) {
        convoJSON.otherUser = convoJSON.user2;
        delete convoJSON.user2;
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[0].text;
      convoJSON.messages.reverse();

      convoJSON.currentUserUnreadCount = 0;
      convoJSON.otherUserUnreadCount = 0;
      for (let i = 0; i < convoJSON.messages.length; ++i) {
        const message = convoJSON.messages[i];
        if (message.isRead) continue;
        if (message.senderId === userId) convoJSON.otherUserUnreadCount += 1;
        else convoJSON.currentUserUnreadCount += 1;
      }

      conversations[i] = convoJSON;
    }
    
    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
