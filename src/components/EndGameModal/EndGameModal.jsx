import React, { useState } from "react";
import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";

const API_URL = "https://wedev-api.sky.pro/api/leaderboard";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, onSaveScore }) {
  const [playerName, setPlayerName] = useState("");
  const [showNameInput, setShowNameInput] = useState(isWon);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const title = isWon ? "Вы победили!" : "Вы проиграли!";
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;
  const imgAlt = isWon ? "celebration emoji" : "dead emoji";

  const handleSaveScore = async () => {
    if (playerName.trim() || !isWon) {
      setIsSaving(true);
      setSaveError(null);
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playerName.trim() || "Пользователь",
            time: gameDurationMinutes * 60 + gameDurationSeconds,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        onSaveScore(data.leaders);
        setShowNameInput(false);
      } catch (e) {
        setSaveError("Произошла ошибка при сохранении результата. Пожалуйста, попробуйте позже.");
        console.error("Ошибка при сохранении результата:", e);
      } finally {
        setIsSaving(false);
      }
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
            disabled={isSaving}
          />
          <Button onClick={handleSaveScore} disabled={isSaving}>
            {isSaving ? "Сохранение..." : "Сохранить результат"}
          </Button>
          {saveError && <p className={styles.error}>{saveError}</p>}
        </div>
      )}
      {!showNameInput && <Button onClick={onClick}>Начать сначала</Button>}
    </div>
  );
}
