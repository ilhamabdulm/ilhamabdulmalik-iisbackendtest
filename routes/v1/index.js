const router = require("express").Router();
const Invitation = require("./invitation");

router.use("/invitations", Invitation);

module.exports = router;
