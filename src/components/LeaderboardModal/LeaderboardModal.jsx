import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LeaderboardModal.module.css";
import { Button } from "../Button/Button";
import celebrationImageUrl from "./images/celebration.png";

export function LeaderboardModal({ time, onSave, onPlayAgain }) {
  const [name, setName] = useState("");

  const handleSave = () => {
    onSave(name || "Пользователь");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <img className={styles.image} src={celebrationImageUrl} alt="celebration" />
        <h2 className={styles.title}>Вы попали на Лидерборд!</h2>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Введите ваше имя"
          className={styles.nameInput}
        />
        <p className={styles.description}>Затраченное время:</p>
        <div className={styles.time}>{formatTime(time)}</div>
        <Button onClick={handleSave} className={styles.saveButton}>
          Сохранить результат
        </Button>
        <Button onClick={onPlayAgain} className={styles.playAgainButton}>
          Играть снова
        </Button>
        <Link to="/leaderboard" className={styles.leaderboardLink}>
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}.${remainingSeconds.toString().padStart(2, "0")}`;
}
