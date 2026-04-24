const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["in progress", "pending", "complete"],
      default: "in progress",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    //번호, 이름, 이메일, 전화번호, 문의내용,상태,
  },
  { timestamps: true },
);

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
