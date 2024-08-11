import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LeaderboardPage.module.css";

const API_URL = "https://wedev-api.sky.pro/api/leaderboard";

export function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLeaderboard(data.leaders);
    } catch (e) {
      setError("Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.");
      console.error("Ошибка при загрузке лидерборда:", e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Лидерборд</h1>
        <button onClick={() => navigate("/")} className={styles.startButton}>
          Начать игру
        </button>
      </div>
      <table className={styles.leaderboard}>
        <thead>
          <tr>
            <th>Позиция</th>
            <th>Пользователь</th>
            <th>Время</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={player.id}>
              <td># {index + 1}</td>
              <td>{player.name}</td>
              <td>{formatTime(player.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}
