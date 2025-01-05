import './App.css';
import {Routes,Route} from 'react-router-dom';
import Leaderboard from './components/leaderboard/Leaderboard';
import Batch from './components/batch/Batch';
import Home from './components/home/Home';
 
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/batch" element={<Batch />} />
      </Routes>
    </div>
  );
}

export default App;
