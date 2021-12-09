const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./user");
const Conversation = require("./conversation");

const UsersConversations = db.define("usersConversations", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  conversationId: {
    type: Sequelize.INTEGER,
    references: {
      model: Conversation,
      key: 'id'
    },
    allowNull: false
  },
  numUnreadMessages: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
module.exports = UsersConversations;
