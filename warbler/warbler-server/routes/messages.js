const express = require("express");
const router = express.Router({mergeParams: true}); // 该option允许我们访问router中的id

const {createMessage, getMessage, deleteMessage} = require("../handlers/messages"); // 如果只有一个module exports 那么不用加方括号 如果有多个exports 要加花括号
// prefix - /api/users/:id/messages
router.route("/").post(createMessage);

// prefix - /api/users/:id/messages/:message_id
router.route("/:message_id")
.get(getMessage)
.delete(deleteMessage);

module.exports = router;