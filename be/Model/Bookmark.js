const mongoose = require("mongoose");
const User = require("./User");
const Photo = require("./Photo");
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
    userId: { type: mongoose.ObjectId, ref: User },
    photoId: { type: mongoose.objectId, ref: Photo },


}, { timestamps: true });

BookmarkSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.__v;
    delete obj.updatedAt;
    delete obj.createdAt;
    return obj;
};


//user스키마 모델로 뽑기
const Bookmark = mongoose.model("Bookmark", BookmarkSchema);
module.exports = Bookmark;
