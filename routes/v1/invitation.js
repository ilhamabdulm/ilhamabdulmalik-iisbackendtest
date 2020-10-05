const router = require("express").Router();
const Controller = require("../../api/v1/controllers/invitation");

router.get("/", Controller.getInvitations);
router.post("/", Controller.addInvitation);
router.patch("/arrival_status/:id", Controller.updateArrivalStatus);
router.delete("/:id", Controller.removeInvitationMember);

module.exports = router;
