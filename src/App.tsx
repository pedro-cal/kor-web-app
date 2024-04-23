import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UserList from './routes/UserList';
import Feed from './routes/Feed';

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/friends" element={<UserList />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </main>
  );
}

export default App;
