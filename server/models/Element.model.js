const { Schema, model } = require("mongoose");

const elementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    code: {
      type: String
    },
    response: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const Element = model("Element", elementSchema);
module.exports = Element;
