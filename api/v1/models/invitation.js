const { model, Schema } = require("mongoose");

const invitationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "Name already invited"],
  },
  address: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  arrival_status: {
    type: Boolean,
  },
});

const Invitation = model("Invitation", invitationSchema);

module.exports = Invitation;
