import './App.css';
import {Routes,Route} from 'react-router-dom';
import Leaderboard from './components/leaderboard/Leaderboard';
 
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
