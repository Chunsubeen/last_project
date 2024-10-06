import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./HomePage.style.css";

const HomePage = ({ myPhotos }) => {
  const [center, setCenter] = useState({ lat: 37.422, lng: -122.084 });
  const [isMapLoaded, setIsMapLoaded] = useState(false); // 지도 로드 상태 추가

  useEffect(() => {
    // 사용자의 위치를 받아오는 함수
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("위치를 가져올 수 없습니다. 기본 위치로 설정합니다.");
        }
      );
    }
  }, []);

  useEffect(() => {
    if (myPhotos.length > 0) {
      // 첫 번째 사진의 위치로 중심 설정
      setCenter({
        lat: myPhotos[0].location.latitude,
        lng: myPhotos[0].location.longitude,
      });
    }
  }, [myPhotos]);

  const handleMapLoad = () => {
    setIsMapLoaded(true); // 지도가 로드된 후 상태를 true로 설정
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      onLoad={handleMapLoad}
    >
      <div className="map-container">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center} // 사용자의 위치 또는 첫 번째 사진의 위치로 지도의 중심 설정
          zoom={13}
        >
          {/* Google Maps API가 로드된 후에만 마커를 렌더링 */}
          {isMapLoaded &&
            window.google &&
            myPhotos.length > 0 &&
            myPhotos.map((photo) => (
              <Marker
                key={photo._id}
                position={{
                  lat: photo.location.latitude,
                  lng: photo.location.longitude,
                }}
              />
            ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default HomePage;
