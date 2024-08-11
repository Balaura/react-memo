import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./LeaderboardPage.module.css";
import { Button } from "../../components/Button/Button";

const API_URL = "https://wedev-api.sky.pro/api/leaderboard";

export function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <h1 className={styles.title}>Лидерборд</h1>
      <table className={styles.leaderboard}>
        <thead>
          <tr>
            <th>Место</th>
            <th>Имя</th>
            <th>Время (сек)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className={styles.backLink}>
        <Button>Вернуться на главную</Button>
      </Link>
    </div>
  );
}
