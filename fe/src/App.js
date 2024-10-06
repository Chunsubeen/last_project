import { Routes, Route, useNavigate } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import BookmarkPage from './pages/BookmarkPage/BookmarkPage';
import { useEffect, useState } from 'react';
import PrivateRoute from './route/PrivateRoute';
import api from './utils/api';
import MyPage from './pages/MyPage/MyPage';


function App() {
  const [myPhotos, setMyPhotos] = useState([]);

  const getMyPhotos = async () => {
    const response = await api.get('/photo')
    // console.log("fff", response)
    setMyPhotos(response.data.data)
  };
  useEffect(() => {
    getMyPhotos();
  }, []);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const response = await api.get("/user/me")
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null)
    }
  };

  useEffect(() => {
    getUser()
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // 토큰 삭제
    setUser(null);
    navigate("/");
  };


  return (
    <Routes>
      <Route path="/" element={<AppLayout user={user} handleLogout={handleLogout} />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage user={user} setUser={setUser} />} />
        <Route index element={<HomePage myPhotos={myPhotos} />} />
        <Route path="bookmark" element={<PrivateRoute user={user}><BookmarkPage /></PrivateRoute>} />
        <Route path="mypage" element={<PrivateRoute user={user}><MyPage myPhotos={myPhotos} user={user} /></PrivateRoute>} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
