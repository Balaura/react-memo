import React, { useState } from "react";
import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, onSaveScore }) {
  const [playerName, setPlayerName] = useState("");
  const [showNameInput, setShowNameInput] = useState(isWon);

  const title = isWon ? "Вы победили!" : "Вы проиграли!";
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;
  const imgAlt = isWon ? "celebration emoji" : "dead emoji";

  const handleSaveScore = () => {
    if (playerName.trim()) {
      onSaveScore(playerName, gameDurationMinutes * 60 + gameDurationSeconds);
      setShowNameInput(false);
    }
  };

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart(2, "0")}.{gameDurationSeconds.toString().padStart(2, "0")}
      </div>
      {showNameInput && (
        <div className={styles.nameInput}>
          <input
            type="text"
            placeholder="Введите ваше имя"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
          />
          <Button onClick={handleSaveScore}>Сохранить результат</Button>
        </div>
      )}
      {!showNameInput && <Button onClick={onClick}>Начать сначала</Button>}
    </div>
  );
}
