const Photo = require("../Model/Photo");

const photoController = {};

// 사진 생성 컨트롤러 함수
photoController.createPhoto = async (req, res) => {
    try {
        const { image, description, location } = req.body;
        //authenticate에서 들고오기
        const { userId } = req;
        // Photo 인스턴스 생성
        const photo = new Photo({
            author: userId, // 사용자 ID
            image, // 사진 URL
            description, // 설명
            location // 위치 정보 (위도 및 경도)
        });

        // 데이터베이스에 사진 저장
        await photo.save();

        // 성공 응답 전송
        res.status(200).json({ status: "success", photo });
    } catch (error) {
        // 에러 발생 시 실패 응답 전송
        res.status(400).json({ status: "fail", error: error.message });
    }
};
photoController.getPhoto = async (req, res) => {
    try {
        const photos = await Photo.find({}).populate("author");
        res.status(200).json({ status: "success", data: photos })
    } catch (error) {
        res.status(400).json({ status: "fail", error: error.message });
    }
};



module.exports = photoController;
