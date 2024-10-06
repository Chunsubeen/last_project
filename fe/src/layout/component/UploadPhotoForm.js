import React, { useState } from 'react';
import { Form, Modal, Button, Alert } from "react-bootstrap";
import EXIF from 'exif-js';
import api from '../../utils/api';

const UploadPhotoForm = ({ show, handleClose }) => {
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file); // 이미지 파일 설정

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    EXIF.getData(image, function () {
                        const lat = EXIF.getTag(this, 'GPSLatitude');
                        const lon = EXIF.getTag(this, 'GPSLongitude');
                        const latRef = EXIF.getTag(this, 'GPSLatitudeRef');
                        const lonRef = EXIF.getTag(this, 'GPSLongitudeRef');

                        if (lat && lon) {
                            const latitude = convertDMSToDD(lat[0], lat[1], lat[2], latRef);
                            const longitude = convertDMSToDD(lon[0], lon[1], lon[2], lonRef);
                            setLatitude(latitude);
                            setLongitude(longitude);
                            console.log("위도:", latitude, "경도:", longitude);
                        } else {
                            console.log("위치 정보가 없습니다.");
                        }
                    });
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const convertDMSToDD = (degrees, minutes, seconds, direction) => {
        let dd = degrees + minutes / 60 + seconds / 3600;
        if (direction === "S" || direction === "W") {
            dd = dd * -1;
        }
        return dd;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!photo) { // 이미지가 선택되었는지 확인
            setShowAlert(true);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('image', photo); // image 필드에 사진 추가
        if (description) {
            formDataToSend.append('description', description);
        }
        if (latitude && longitude) {
            formDataToSend.append('location[latitude]', latitude);
            formDataToSend.append('location[longitude]', longitude);
        }

        console.log("전송할 이미지:", formDataToSend.get('image')); // 이미지를 확인
        console.log("설명:", description);
        console.log("위도:", latitude);
        console.log("경도:", longitude);

        try {
            const response = await api.post("/photo", formDataToSend);
            if (response.status !== 200) throw new Error(response.error);
            alert("사진 업로드 완료");
            handleClose(); // 업로드 성공 후 모달 닫기
        } catch (error) {
            console.log("사진 업로드 중 오류 발생:", error);
        }
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop={true}>
            <Modal.Header closeButton>
                <Modal.Title>Upload New Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showAlert && <Alert variant="danger">사진을 업로드해 주세요.</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Photo</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description (optional)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter a description (optional)"
                            onChange={handleDescriptionChange}
                            value={description}
                        />
                    </Form.Group>
                    <Button type="submit" className="mt-3">
                        Upload
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UploadPhotoForm;
