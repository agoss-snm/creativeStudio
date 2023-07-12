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
    }
  },
  { timestamps: true } // Agregar timestamps para almacenar la fecha de creación y actualización
);

const Element = model("Element", elementSchema);
module.exports = Element;
