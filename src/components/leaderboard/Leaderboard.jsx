import React, { useState } from 'react';
import './Leaderboard.css';
import Navbar from '../navbar/Navbar';
import Haxtrek_logo from '../../assets/Haxtrek_logo.png';
import { FaSearch } from 'react-icons/fa';
import { Award } from 'lucide-react';
import data from '../../details/personal_details.json';
import Footer from '../../components/footer/Footer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList,ResponsiveContainer  } from 'recharts';

function Leaderboard() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const sortedData = [...data].sort((a, b) => {
    if (b.score === a.score) {
      return a.name.localeCompare(b.name);
    }
    return b.score - a.score;
  });

  const rankedData = [];
  let currentRank = 1;

  sortedData.forEach((entry, index) => {
    if (index > 0 && entry.score === sortedData[index - 1].score) {
      entry.rank = rankedData[rankedData.length - 1].rank;
    } else {
      entry.rank = currentRank;
    }
    rankedData.push(entry);
    currentRank++;
  });

  const topThreeData = rankedData
    .filter((entry) => entry.rank <= 3)
    .sort((a, b) => {
      const customOrder = [2, 1, 3];
      return customOrder.indexOf(a.rank) - customOrder.indexOf(b.rank);
    });

  const filteredData = rankedData.filter((entry) => {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    return (
      entry.name.toLowerCase().includes(lowerCaseSearchValue) ||
      (entry.batch && entry.batch.toLowerCase().includes(lowerCaseSearchValue)) ||
      entry.score.toString().includes(lowerCaseSearchValue) ||
      entry.rank.toString().includes(lowerCaseSearchValue)
    );
  });


  

  


  const getMedalIcon = (rank) => {
    const colors = {
      1: '#FFD700',
      2: '#C0C0C0',
      3: '#CD7F32',
    };

    if (rank <= 3) {
      return (
        <div
          className="medal-container"
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '40px',
            height: '40px',
          }}
        >
          <Award color={colors[rank]} size={32} />
          <span
            className="medal-rank-leaderboard"
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
              fontSize: '14px',
              fontWeight: 'bold',
              color: colors[rank],
            }}
          >
            {rank}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="leaderboard-container">
      <Navbar />
      <div className="leaderboard-content">
        <div className="leaderboard-header">
          <div className="leaderboard-header-item">
            <img
              src={Haxtrek_logo}
              alt="Haxtrek Logo"
              className="haxtrek-logo"
              style={{ width: '200px', height: '50px' }}
            />
            <h2>&gt; Leaderboard &gt; profile</h2>
          </div>
          <div className="leaderboard-header-item">
            <div className="search-container">
              <FaSearch size={20} className="search-icon" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search..."
                className="search-input"
              />
            </div>
          </div>
        </div>


        <div className="leaderboard-graph">
          <h1>Top Scores</h1>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={topThreeData}>
              <XAxis dataKey="name" className="x-axi" />
              <YAxis className="y-axis" domain={[0, (dataMax) => Math.ceil(dataMax * 1.1)]} />
              <Tooltip />
              <Bar dataKey="score" fill="#8884d8">
                <LabelList dataKey="rank" position="top" className="rank" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
      



        <div className="leaderboard-table-container">
          <h1>Leader Board</h1>
          {filteredData.length === 0 && searchValue ? (
            <p>No results found for "{searchValue}"</p>
          ) : (
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Points</th>
                  <th>Batch</th>
                  <th>Profile</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry, index) => (
                  <tr key={index}>
                    <td data-label="Rank">
                      {getMedalIcon(entry.rank) || entry.rank}
                    </td>
                    <td data-label="Name">{entry.name}</td>
                    <td data-label="Points">{entry.score}</td>
                    <td data-label="Batch">{entry.batch || 'No batch available'}</td>
                    <td data-label="Profile" className="profile-button">
                      <a
                        href={entry.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="btn">View Profile</button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Leaderboard;
