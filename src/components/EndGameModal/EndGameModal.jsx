import React from "react";
import { Link } from "react-router-dom";
import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import celebrationImageUrl from "./images/celebration.png";
import deadImageUrl from "./images/dead.png";

export function EndGameModal({ isWon, time, onPlayAgain }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <img
          className={styles.image}
          src={isWon ? celebrationImageUrl : deadImageUrl}
          alt={isWon ? "celebration" : "game over"}
        />
        <h2 className={styles.title}>{isWon ? "Вы выиграли!" : "Вы проиграли"}</h2>
        <p className={styles.description}>Затраченное время:</p>
        <div className={styles.time}>{formatTime(time)}</div>
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
