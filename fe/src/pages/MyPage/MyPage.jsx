import React from "react";
import MyPhoto from "./component/MyPhoto/MyPhoto";
import { Container, Row, Col } from "react-bootstrap"; // Bootstrap의 Container, Row, Col을 사용

const MyPage = ({ myPhotos, user }) => {
  const userPhotos = myPhotos.filter(
    (photo) => photo.author.email === user.email
  );

  return (
    <Container>
      <h1>{user.name}'s Photos</h1>
      {userPhotos.length > 0 ? (
        <Row>
          {userPhotos.map((photo) => (
            <Col key={photo._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <MyPhoto photo={photo} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No photos found</p>
      )}
    </Container>
  );
};

export default MyPage;
