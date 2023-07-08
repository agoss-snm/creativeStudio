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
    }
  }
);

const Element = model("Element", elementSchema);
module.exports = Element;