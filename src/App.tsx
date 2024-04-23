import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UserList from './routes/UserList';
import Feed from './routes/Feed';
import ProtectedRoute from './routes/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initialAppLoader } from './redux/globalSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAppLoader());
  }, []); //eslint-disable-line

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route
          path="/friends"
          element={<ProtectedRoute element={<UserList />} />}
        />
        <Route path="/feed" element={<ProtectedRoute element={<Feed />} />} />
      </Routes>
    </main>
  );
}

export default App;
