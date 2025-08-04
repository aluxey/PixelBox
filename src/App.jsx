import Footer from './components/footer.jsx';
import Navbar from './components/navbar.jsx';
import GameList from './pages/GameList.jsx';
import './styles/global.css';

function App() {
  return (
    <>
      <Navbar />
      <GameList />
      <Footer />
    </>
  );
}

export default App;
