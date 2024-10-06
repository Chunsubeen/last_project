const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 커뮤니티 글 스키마
const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 글을 작성한 사용자
    title: { type: String, required: true }, // 글 제목
    content: { type: String, required: true }, // 글 내용
    photos: [{ type: Schema.Types.ObjectId, ref: "Photo" }], // 첨부된 사진들
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 댓글 작성자
        content: { type: String, required: true }, // 댓글 내용
        createdAt: { type: Date, default: Date.now } // 댓글 작성 시간
    }]
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
