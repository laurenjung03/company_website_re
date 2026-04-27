const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    number: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    fileUrl: { type: [String] },
    views: { type: Number, default: 0 },

    viewLogs: [
      {
        ip: String, //ip번호
        userAgent: String, //chrome, safari ,,,
        TimeStamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    /**ip:string, userAgent:String, */
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
