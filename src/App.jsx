import { Routes, Route } from 'react-router-dom';

import SignInSignUp from './pages/SignInSignUp';
import Footer from './components/footer.jsx';
import Navbar from './components/navbar.jsx';
import GameList from './pages/GameList.jsx';
import './styles/global.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/auth" element={<SignInSignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
