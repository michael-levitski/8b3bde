const db = require("../db");
const Sequelize = require("sequelize");

const Conversation = db.define("conversation", {
  // users should be allowed to name their group chats
  // but the name will be null if it's just a regular conversation
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  }
});

module.exports = Conversation;
