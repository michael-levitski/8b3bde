const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UsersConversations = require("./usersConversations");

// associations

Message.belongsTo(Conversation);
Conversation.hasMany(Message);
User.belongsToMany(Conversation, { through: UsersConversations });
Conversation.belongsToMany(User, { through: UsersConversations });

module.exports = {
  User,
  Conversation,
  Message
};
