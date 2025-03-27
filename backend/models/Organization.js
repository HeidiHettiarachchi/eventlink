const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    president: {
      type: String,
      required: true,
    },
    staffAdvisor: {
      type: String,
      required: true,
    },
    eventIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Event",
    },
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
