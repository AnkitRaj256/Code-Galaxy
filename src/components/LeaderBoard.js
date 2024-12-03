import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './CSS/LeaderBoard.css'; // Styles are included below

const LeaderBoard = () => {
  // Example leaderboard data
  const [leaders, setLeaders] = useState([
    { rank: 1, name: 'Alice', score: 1500 },
    { rank: 2, name: 'Bob', score: 1400 },
    { rank: 3, name: 'Charlie', score: 1300 },
    { rank: 4, name: 'David', score: 1200 },
    { rank: 5, name: 'Eve', score: 1100 },
  ]);

  return (
    <motion.section
      className="leaderboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="leaderboard-heading"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        Leaderboard
      </motion.h1>

      <motion.table
        className="leaderboard-table"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader) => (
            <motion.tr
              key={leader.rank}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <td>{leader.rank}</td>
              <td>{leader.name}</td>
              <td>{leader.score}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </motion.section>
  );
};

export default LeaderBoard;
