import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useGameContext } from "../../context/GameContext";
import { Button } from "../../components/Button/Button";

export function SelectLevelPage() {
  const { isSimpleMode, setIsSimpleMode } = useGameContext();
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = pairsCount => {
    setSelectedLevel(pairsCount);
  };

  const handlePlay = () => {
    if (selectedLevel) {
      navigate(`/game/${selectedLevel}${isSimpleMode ? "?simple=true" : ""}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <div className={styles.levels}>
          {[3, 6, 9].map((level, index) => (
            <button
              key={level}
              className={`${styles.levelButton} ${selectedLevel === level ? styles.selected : ""}`}
              onClick={() => handleLevelSelect(level)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id="simpleMode"
            checked={isSimpleMode}
            onChange={e => setIsSimpleMode(e.target.checked)}
          />
          <label htmlFor="simpleMode">Легкий режим (3 жизни)</label>
        </div>
        <Button onClick={handlePlay} disabled={!selectedLevel} className={styles.playButton}>
          Играть
        </Button>
        <Link to="/leaderboard" className={styles.leaderboardLink}>
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}
