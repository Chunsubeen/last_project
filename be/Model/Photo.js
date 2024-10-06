const mongoose = require('mongoose');
const User = require("./User");
const Schema = mongoose.Schema;

// 사진 업로드와 관련된 스키마를 정의
const photoSchema = new Schema({
    // 사진을 업로드한 유저의 ID (User 모델과의 참조)
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // User 모델 참조
        required: true
    },
    image: {
        type: String,
        required: true
    },
    // 사진에 대한 설명 (300자 이하)
    description: {
        type: String,
        maxlength: 300, // 설명의 최대 길이 설정
    },
    // 사진의 위치 정보 (위도와 경도)
    location: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
}, { timestamps: true });

photoSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.__v;
    delete obj.updatedAt;
    delete obj.createdAt;
    return obj;
};


// Photo 모델 생성
const Photo = mongoose.model('Photo', photoSchema);

// Photo 모델을 외부에서 사용할 수 있도록 모듈로 내보냄
module.exports = Photo;
