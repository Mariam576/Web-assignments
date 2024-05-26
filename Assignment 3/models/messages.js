const mongoose = require("mongoose");
let messageSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  message: String,
 
});
let Message = mongoose.models.Message || mongoose.model("user_messages",messageSchema);
module.exports = Message;