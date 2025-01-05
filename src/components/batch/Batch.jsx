import React, { useState, useMemo } from 'react';
import Navbar from '../navbar/Navbar';
import Haxtrek_logo from '../../assets/Haxtrek_logo.png';
import { FaSearch } from 'react-icons/fa';
import './Batch.css';
import { Award } from 'lucide-react';
import Footer from '../footer/Footer';
import data from '../../details/personal_details.json';

function Batch() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const rankedBatchGroups = useMemo(() => {
    const groups = data.reduce((acc, entry) => {
      if (!acc[entry.batch]) {
        acc[entry.batch] = [];
      }
      acc[entry.batch].push(entry);
      return acc;
    }, {});

    const processedGroups = Object.keys(groups).map((batch) => {
      const batchData = groups[batch];
      batchData.sort((a, b) => b.score - a.score);

      const totalPoints = batchData.reduce((sum, student) => sum + student.score, 0);

      return {
        batch,
        students: batchData,
        totalPoints,
      };
    });

    return processedGroups
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .map((group, index) => ({
        ...group,
        originalRank: index + 1
      }));
  }, []);

  const filteredBatchGroups = useMemo(() => {
    const lowerCaseSearchValue = searchValue.toLowerCase();
    return rankedBatchGroups.filter((group) => 
      group.batch.toLowerCase().includes(lowerCaseSearchValue) ||
      group.totalPoints.toString().includes(lowerCaseSearchValue) ||
      group.originalRank.toString().includes(lowerCaseSearchValue)
    );
  }, [searchValue, rankedBatchGroups]);

  const getMedalIcon = (rank) => {
    const colors = {
      1: '#FFD700',
      2: '#C0C0C0',
      3: '#CD7F32',
    };

    if (rank <= 3) {
      return (
        <div className="medal-container" style={{ 
            position: 'relative' ,
            display: 'inline-block',
            width: '40px',
            height: '40px',
          }}>
          <Award color={colors[rank]} size={32} />
          <span
            className="medal-rank"
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
    return rank;
  };

  return (
    <div className="batch-container">
      <Navbar />
      <div className="batch-content">
        <div className="batch-header">
          <div className="batch-header-item">
            <img
              src={Haxtrek_logo}
              alt="Haxtrek Logo"
              className="haxtrek-logo"
              style={{ width: '200px', height: '50px' }}
            />
            <h2>&gt; Batch &gt; profile</h2>
          </div>
          <div className="batch-header-item">
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


          <div className="batch-table-container">
            <h1>Batch Leaderboard</h1>
            <table className="batch-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Batch</th>
                  <th>Total Points</th>
                  <th>Registed of Students</th>
                </tr>
              </thead>
              <tbody>
                {filteredBatchGroups.map((group) => (
                  <tr key={group.batch}>
                    <td data-label="Rank">
                      {getMedalIcon(group.originalRank)}
                    </td>
                    <td data-label="Batch">{group.batch}</td>
                    <td data-label="Total Points">{group.totalPoints}</td>
                    <td data-label="Registed of Students">{group.students.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

      </div>
      <Footer />
    </div>
  );
}

export default Batch;
