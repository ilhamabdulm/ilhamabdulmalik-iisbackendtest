const Model = require("../models/invitation");

class InvitationController {
  static async getInvitations(req, res) {
    try {
      const response = await Model.find();
      if (response.length) {
        res.status(200).json({
          code: 200,
          success: true,
          data: response,
          message: "Get all invitations",
        });
      }
      throw "Invitations data is Empty";
    } catch (e) {
      res.status(500).json({
        code: 500,
        success: false,
        message: "Error",
        data: e,
      });
    }
  }

  static async addInvitation(req, res) {
    try {
      const payload = { ...req.body, arrival_status: false };
      const response = await Model.create(payload);
      if (response) {
        res.status(201).json({
          code: 201,
          success: true,
          data: {},
          message: "Invitation Success",
        });
      }
    } catch (e) {
      if (e.name === "MongoError" && e.keyPattern.name) {
        res.status(400).json({
          code: 400,
          success: false,
          data: {},
          message: "Name already invited, please enter another name",
        });
      }
      res.status(500).json({
        code: 500,
        success: false,
        message: "Error",
        data: e,
      });
    }
  }

  static async removeInvitationMember(req, res) {
    try {
      const id = req.params.id;
      const invitationData = await Model.findById(id);
      if (!invitationData.arrival_status) {
        await Model.findByIdAndDelete(id);
        res.status(200).json({
          code: 200,
          success: true,
          data: {},
          message: "Remove Member Success",
        });
      }
      throw "Arrival Status is confirmed, cannot remove invitation";
    } catch (e) {
      res.status(500).json({
        code: 500,
        success: false,
        message: "Error",
        data: e,
      });
    }
  }

  static async updateArrivalStatus(req, res) {
    try {
      const status = { arrival_status: true };
      const id = req.params.id;
      await Model.findByIdAndUpdate(id, status);
      res.status(200).json({
        code: 200,
        success: true,
        data: {},
        message: "Arrival Status Updated",
      });
    } catch (e) {
      res.status(500).json({
        code: 500,
        success: false,
        message: "Error",
        data: e,
      });
    }
  }
}

module.exports = InvitationController;
